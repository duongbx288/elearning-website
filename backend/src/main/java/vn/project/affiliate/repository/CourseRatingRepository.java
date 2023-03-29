package vn.project.affiliate.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import vn.project.affiliate.entity.CourseRatingEntity;

import java.util.List;

public interface CourseRatingRepository extends BaseRepository<CourseRatingEntity, Long> {

    @Query(value="select * from course_rating where id = ?1", nativeQuery = true)
    CourseRatingEntity getById(Integer id);

    CourseRatingEntity getByValue(Integer value);

    List<CourseRatingEntity> findByStudentId(int studentId);

    List<CourseRatingEntity> findByCourseId(int courseId);

    Page<CourseRatingEntity> findByCourseId(int courseId, Pageable pageable);

    CourseRatingEntity findByStudentIdAndAndCourseId(int studentId, int CourseId);
}
