package vn.project.affiliate.repository;

import org.springframework.data.jpa.repository.Query;
import vn.project.affiliate.entity.StudentCourseEntity;

import java.util.List;

public interface StudentCourseRepository extends BaseRepository<StudentCourseEntity, Long>{

    @Query(value="select * from student_course where id = ?1", nativeQuery = true)
    StudentCourseEntity getById(Integer id);

    @Query(value="select sc.course_id from student_course as sc where student_id = ?1", nativeQuery = true)
    List<Integer> getListIdByStudentId(Integer id);

    List<StudentCourseEntity> findByStudentId(int id);

    StudentCourseEntity findByStudentIdAndAndCourseId(int studentId, int courseId);

}
