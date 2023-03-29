package vn.project.affiliate.service;

import org.springframework.data.domain.Page;
import org.springframework.transaction.annotation.Transactional;
import vn.project.affiliate.dto.LessonDTO;
import vn.project.affiliate.entity.LessonEntity;

import java.util.List;

public interface LessonService extends BaseService<LessonEntity, Long> {

    Page<LessonDTO> getByPagination(int pageNum, int pageLimit);

    @Transactional
    void createLesson(List<LessonDTO> lessonDTOs);

    LessonDTO getById(Integer id);

    List<LessonDTO> getByCourseId(int id);
//    Page<LessonDTO> getByCourseId(int id);

    String updateLesson(LessonDTO lessonDTO);

    String updateStatus(int id, String status);

    String deleteLesson(int id);
}
