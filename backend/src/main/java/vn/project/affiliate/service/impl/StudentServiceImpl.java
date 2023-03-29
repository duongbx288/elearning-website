package vn.project.affiliate.service.impl;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.project.affiliate.dto.StudentDTO;
import vn.project.affiliate.entity.StudentEntity;
import vn.project.affiliate.mapper.StudentMapper;
import vn.project.affiliate.repository.StudentRepository;
import vn.project.affiliate.service.StudentService;

import java.lang.reflect.Array;
import java.util.List;

@Slf4j
@Service
public class StudentServiceImpl extends BaseServiceImpl<StudentEntity, Long> implements StudentService {
    private final StudentRepository studentRepository;
    private final StudentMapper studentMapper;

    public StudentServiceImpl(StudentRepository studentRepository, StudentMapper studentMapper) {
        super(studentRepository);
        this.studentRepository = studentRepository;
        this.studentMapper = studentMapper;
    }

    @Override
    public StudentDTO getById(long id) {
        var student = studentRepository.getById(id);
        return studentMapper.toDto(student);
    }

    @Override
    public Page<StudentDTO> findStudentPagination(int pageNum, int pageLimit){
        Pageable pageable = PageRequest.of(pageNum, pageLimit);
        var students = findAll(pageable);
        Page<StudentDTO> studentDTOS = students.map(student -> {
            return studentMapper.toDto(student);
        });
        return studentDTOS;
    }

    public boolean validateAvailableId(int id) {
        var existStudent = findById((long) id);
        if (existStudent.isEmpty()) {
            return false;
        }
        return true;
    }

    @Override
    public String updateStatus(int id, String status) {
        boolean validate1 = validateAvailableId(id);
        if (validate1 == false) return "Student not exists";
        try {
            studentRepository.updateStatus(status, id);
        } catch (Exception e){
            log.error(e.toString());
            return e.toString();
        }
        return "Success";
    }

    @Override
    public String deleteStudent(int id) {
        boolean validate1 = validateAvailableId(id);
        if (validate1 == false) return "Student not exists";

        try {
            studentRepository.deleteStudent(id);
        } catch (Exception e){
            log.error(e.toString());
            return e.toString();
        }

        return "Success";
    }

    @Override
    public boolean updateStudent(StudentDTO student) {
        var existStudent = findById(student.getId());
        if(existStudent.isEmpty()){
            return false;
        }

        StudentEntity student1 = studentMapper.toEntity(student);
        save(student1);

        return true;
    }

    @Override
    public long countSumPurchased(int id){
            var count = studentRepository.countSumPurchased(id);
            return count;
    }

    @Override
    public int countCoursesBought(int id){
        var count = studentRepository.countCoursesBought(id);
        return count;
    }

    @Override
    public int countCoursesCompleted(int id){
        var count = studentRepository.countCoursesCompleted(id);
        return count;
    }

}

