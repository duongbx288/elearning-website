package vn.project.affiliate.service;

import org.springframework.transaction.annotation.Transactional;
import vn.project.affiliate.dto.StudentCourseDTO;
import vn.project.affiliate.entity.StudentCourseEntity;

import java.util.List;

public interface StudentCourseService extends BaseService<StudentCourseEntity, Long> {
    List<StudentCourseDTO> getAllStudentCourse();

    @Transactional
    boolean createStudentCourse(int studentId, int courseId);

    List<Integer> getListIdCourseByStudentId(int id);

    List<StudentCourseDTO> getByStudentId(int id);

    StudentCourseDTO getByStudentAndCourseId(int studentId, int courseId);
}
