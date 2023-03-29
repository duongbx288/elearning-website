package vn.project.affiliate.service;

import org.springframework.data.domain.Page;
import org.springframework.data.relational.core.sql.In;
import org.springframework.transaction.annotation.Transactional;
import vn.project.affiliate.dto.StudentDTO;
import vn.project.affiliate.entity.StudentEntity;

import java.lang.reflect.Array;
import java.util.List;

public interface StudentService extends BaseService<StudentEntity, Long> {
    List<StudentEntity> getAll();
    StudentDTO getById(long id);

    Page<StudentDTO> findStudentPagination(int pageNum, int pageLimit);

    @Transactional
    boolean updateStudent(StudentDTO studentDTO);

    String updateStatus(int id, String status);

    String deleteStudent(int id);

    long countSumPurchased(int id);

    int countCoursesBought(int id);

    int countCoursesCompleted(int id);
}
