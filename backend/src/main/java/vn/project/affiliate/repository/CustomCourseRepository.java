package vn.project.affiliate.repository;

import org.springframework.data.domain.Page;
import vn.project.affiliate.dto.request.CourseCriteria;
import vn.project.affiliate.entity.CourseEntity;

import java.util.List;

public interface CustomCourseRepository {

    Page<CourseEntity> findCourses(CourseCriteria criteria);
}
