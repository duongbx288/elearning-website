package vn.project.affiliate.service.impl;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import vn.project.affiliate.dto.UserAccountDTO;
import vn.project.affiliate.dto.request.UserAccountRequest;
import vn.project.affiliate.entity.StudentEntity;
import vn.project.affiliate.entity.TypeEntity;
import vn.project.affiliate.entity.UserAccountEntity;
import vn.project.affiliate.mapper.UserAccountMapper;
import vn.project.affiliate.repository.UserAccountRepository;
import vn.project.affiliate.service.StudentCourseService;
import vn.project.affiliate.service.StudentService;
import vn.project.affiliate.service.TypeService;
import vn.project.affiliate.service.UserAccountService;

import java.util.List;

@Slf4j
@Service
public class UserAccountServiceImpl extends BaseServiceImpl<UserAccountEntity, Long> implements UserAccountService {

    private final UserAccountRepository repository;
    private final UserAccountMapper mapper;
    private final StudentService studentService;
    private final StudentCourseService studentCourseService;

    public UserAccountServiceImpl(UserAccountRepository repository, UserAccountMapper userAccountMapper,
                                  StudentCourseService studentCourseService, StudentService studentService){
        super(repository);
        this.mapper = userAccountMapper;
        this.repository = repository;
        this.studentService = studentService;
        this.studentCourseService = studentCourseService;
    }

    @Override
    public List<String> getInfoByUsername(String username) {
        return repository.getUserByUsername(username);
    }

    @Override
    public UserAccountDTO updateUser(UserAccountDTO dto) {
        var updated = save(mapper.toEntity(dto));
        return mapper.toDto(updated);
    }

    @Override
    public UserAccountDTO findById(int userId) {
        var userInfo = repository.getByUserId(userId);
        return mapper.toDto(userInfo);
    }

    @Override
    public UserAccountDTO findByUsername(String username) {
        var userInfo = repository.getByUsername(username);
        return mapper.toDto(userInfo);
    }

    @Override
    public List<String> getInfoByEmail(String email) {
        return repository.getUserByEmail(email);
    }

    @Override
    public UserAccountDTO findUserInfo(String info){
        var user = repository.getByUsername(info);
        var courseList = studentCourseService.getListIdCourseByStudentId(user.getStudentId());
        var roles = repository.getRoles(info);
        var dto = mapper.toDto(user);
        dto.setListCourses(courseList);
        dto.setRoles(roles.get(0));
        return dto;
    }

    @Override
    public String addNewUser(UserAccountRequest userAccountDTO) {
        var newUsername = userAccountDTO.getUsername();
        var newEmail = userAccountDTO.getEmail();
        var emExist = repository.getUserByEmail(newEmail);
        var usExist = repository.getUserByUsername(newUsername);

        if(emExist.isEmpty() && usExist.isEmpty()) {
            StudentEntity studentEntity = new StudentEntity();
            studentEntity.setStatus("active");
            if (userAccountDTO.getName() != null) {
                studentEntity.setName(userAccountDTO.getName());
            }
            studentEntity = studentService.save(studentEntity);
            UserAccountEntity newAcc = new UserAccountEntity();
            newAcc.setPassword(userAccountDTO.getPassword());
            newAcc.setUsername(userAccountDTO.getUsername());
            newAcc.setStudentId(Math.toIntExact(studentEntity.getId()));
            newAcc.setStatus("active");
            if (userAccountDTO.getEmail() != null) {
                newAcc.setEmail(userAccountDTO.getEmail());
            }
            newAcc.setTeacherId(null);
            newAcc.setAffiliateId(null);
            UserAccountEntity saved = save(newAcc);
            Long newAccId = saved.getId();
            repository.saveNewRoles(newAccId, 2);
            return "Success";
        } else {
            System.out.println("Exist");
            return "Email or Username exist";
        }
    }



}
