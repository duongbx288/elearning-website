package vn.project.affiliate.service.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import vn.project.affiliate.dto.LessonDTO;
import vn.project.affiliate.entity.LessonEntity;
import vn.project.affiliate.mapper.LessonMapper;
import vn.project.affiliate.repository.LessonInfoRepository;
import vn.project.affiliate.repository.LessonRepository;
import vn.project.affiliate.service.LessonService;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Slf4j
@Service
public class LessonServiceImpl extends BaseServiceImpl<LessonEntity, Long> implements LessonService {
    private final LessonRepository lessonRepository;
    private final LessonMapper lessonMapper;

    public LessonServiceImpl(LessonRepository lessonRepository, LessonMapper lessonMapper
                             ){
        super(lessonRepository);
        this.lessonRepository = lessonRepository;
        this.lessonMapper = lessonMapper;
    }

    @Override
    public LessonDTO getById(Integer id){
        var lesson = lessonRepository.getById(id);
        return lessonMapper.toDto(lesson);
    }

    @Override
    public void createLesson(List<LessonDTO> lessonDTOS){
        for (LessonDTO dto : lessonDTOS) {
            dto.setCreatedDate(Instant.now());
            dto.setLastModifiedDate(Instant.now());
            var entity = lessonMapper.toEntity(dto);
            save(entity);
        }
        return;
    }

    @Override
    public Page<LessonDTO> getByPagination(int pageNum, int pageLimit){
        Pageable pageable = PageRequest.of(pageNum, pageLimit);
        var lesson = findAll(pageable);
        Page<LessonDTO> dtos = lesson.map(item -> {
            return lessonMapper.toDto(item);
        });
        return dtos;
    }

    @Override
    public List<LessonDTO> getByCourseId(int id){
        var lessons = lessonRepository.getByCourseId(id);
        var dtos = lessonMapper.toDto(lessons);
//        for (LessonDTO lesson: dtos) {
//            var infos = lessonInfoRepository.getByLessonId(lesson.getId());
//            lesson.setLessonInfos(infos);
//        }
        return dtos;
    }

    @Override
    public String updateLesson(LessonDTO lessonDTO){
        try{
            LessonEntity lesson = lessonMapper.toEntity(lessonDTO);
            save(lesson);
        } catch (Exception e) {
            log.error(e.toString());
            return e.toString();
        }

        return "Success";
    }

    @Override
    public String updateStatus(int id, String status){
        try {
            lessonRepository.updateStatus(status, id);
        } catch (Exception e){
            log.error(e.toString());
            return e.toString();
        }

        return "Success";
    }

    @Override
    public String deleteLesson(int id){
        try {
            lessonRepository.deleteLesson(id);
        } catch (Exception e){
            log.error(e.toString());
            return e.toString();
        }

        return "Success";
    }

}
