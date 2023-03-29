package vn.project.affiliate.service.impl;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.project.affiliate.dto.TeacherDTO;
import vn.project.affiliate.entity.TeacherEntity;
import vn.project.affiliate.mapper.TeacherMapper;
import vn.project.affiliate.repository.TeacherRepository;
import vn.project.affiliate.service.TeacherService;
import vn.project.affiliate.service.UserAccountService;

@Slf4j
@Service
public class TeacherServiceImpl extends BaseServiceImpl<TeacherEntity, Long> implements TeacherService {
    private final TeacherRepository teacherRepository;
    private final TeacherMapper teacherMapper;
    private final UserAccountService userAccountService;

    public TeacherServiceImpl(TeacherRepository teacherRepository, TeacherMapper teacherMapper,
                              UserAccountService userAccountService) {
        super(teacherRepository);
        this.teacherRepository = teacherRepository;
        this.teacherMapper = teacherMapper;
        this.userAccountService = userAccountService;
    }

    @Override
    public TeacherDTO registerTeacher(TeacherDTO dto) {
        dto.setStatus("active");
        var username = dto.getUsername();
        if (username.isEmpty() && username.isBlank()) {
            return null;
        }
        var userInfo = userAccountService.findByUsername(username);
        if (userInfo != null) {} else return null;
        var newEntity = teacherMapper.toEntity(dto);
        var newTeacher = save(newEntity);
        var newTeacherId = newTeacher.getId();
        userInfo.setTeacherId(Math.toIntExact(newTeacherId));
        userAccountService.updateUser(userInfo);

        return teacherMapper.toDto(newTeacher);
    }

    @Override
    public TeacherDTO getById(Integer id) {
        var teacher = teacherRepository.getById(id);
        return teacherMapper.toDto(teacher);
    }

    @Override
    public Page<TeacherDTO> getByPagination(int pageNum, int pageLimit){
        Pageable pageable = PageRequest.of(pageNum, pageLimit);
        var teachers = findAll(pageable);
        Page<TeacherDTO> teacherDTOS = teachers.map(teacher -> {
            return teacherMapper.toDto(teacher);
        });
        return teacherDTOS;
    }

    public boolean validateAvailableId(int id) {
        var existTeacher = findById((long) id);
        if (existTeacher.isEmpty()) {
            return false;
        }
        return true;
    }

    @Override
    public String updateTeacher(TeacherDTO teacherDTO){
        var existTeacher = findById(teacherDTO.getId());
        if(existTeacher.isEmpty()){
            return "Teacher not exists";
        }
        String existTeacherCode = existTeacher.get().getTeacherCode();
        var existTeacherCodes = teacherRepository.findByCodeNotSameId(teacherDTO.getTeacherCode(), (int) teacherDTO.getId());
        if(!existTeacherCodes.isEmpty()){
            return "Duplicate teacher-code";
        }
        try {
            TeacherEntity teacher = teacherMapper.toEntity(teacherDTO);
            save(teacher);
        } catch (Exception e) {
            log.error(e.toString());
            return e.toString();
        }

        return "Success";
    }

    @Override
    public String updateStatus(int id, String status) {
        boolean validate1 = validateAvailableId(id);
        if (validate1 == false) return "Teacher not exists";

        try {
            teacherRepository.updateStatus(status, id);
        } catch (Exception e){
            log.error(e.toString());
            return e.toString();
        }

        return "Success";
    }

    @Override
    public String deleteTeacher(int id) {
        boolean validate1 = validateAvailableId(id);
        if (validate1 == false) return "Student not exists";

        try {
            teacherRepository.deleteTeacher(id);
        } catch (Exception e){
            log.error(e.toString());
            return e.toString();
        }

        return "Success";
    }

}
