package vn.project.affiliate.service;

import org.springframework.data.domain.Page;
import org.springframework.transaction.annotation.Transactional;
import vn.project.affiliate.dto.CourseDTO;
import vn.project.affiliate.dto.StudentDTO;
import vn.project.affiliate.dto.request.CourseCriteria;
import vn.project.affiliate.dto.response.CourseResponse;
import vn.project.affiliate.dto.response.TeacherCourseResponse;
import vn.project.affiliate.entity.CourseEntity;

import java.util.List;

public interface CourseService extends BaseService<CourseEntity, Long> {
    List<CourseEntity> getAll();
    CourseDTO getById(int id);

    @Transactional
    boolean createCourse(CourseDTO dto);

    List<CourseDTO> getRecommendCourse(CourseCriteria criteria);

    Page<CourseDTO> getAllPagination(int pageNum, int pageLimit);

    // Khoas hoc nhieu hoc vien
    List<CourseDTO> getTopCourse(int top);

    List<CourseDTO> getTopRatingCourse();

    List<CourseDTO> findNewestCourse();

    List<CourseDTO> getByTeacherId(int id);

//    void searchCourses(CourseCriteria criteria);

    Page<CourseDTO> findCourses(CourseCriteria criteria);

    String updateCourse(CourseDTO dto);

    String updateStatus(int id, String status);

    String deleteCourse(int id);

    int getStudentCount(int id);

    int getStudentComplete(int id);

    CourseResponse getCourseInfo(int courseId);

    List<CourseDTO> getCourseSoldByTeacherId(int id);

    List<CourseDTO> getTopCourseSoldByTeacherId(int teacherId, int limit);

    TeacherCourseResponse getTopRecentCourseBought(int teacherId, int limit);

    TeacherCourseResponse getTopBoughtCourseInParticularMonth(int month, int year, int teacherId, int limit);
}
