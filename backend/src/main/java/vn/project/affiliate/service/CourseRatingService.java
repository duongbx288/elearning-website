package vn.project.affiliate.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import vn.project.affiliate.dto.CourseRatingDTO;
import vn.project.affiliate.entity.CourseRatingEntity;

import javax.transaction.Transactional;
import java.util.List;

public interface CourseRatingService extends BaseService<CourseRatingEntity, Long> {

    List<CourseRatingEntity> getAll();

    List<CourseRatingDTO> getByCourseId(int id);

//    CourseRatingDTO getById(int id);
    Page<CourseRatingDTO> getByCourseIdPag(int id, int pageNum);

    CourseRatingDTO getByStudentAndCourseId(int stuId, int courseId);

    @Transactional
    CourseRatingDTO createCourseRating(CourseRatingDTO dto);
}
