package vn.project.affiliate.repository;

import org.springframework.data.jpa.repository.Query;
import vn.project.affiliate.entity.LessonEntity;
import vn.project.affiliate.entity.LessonInfoEntity;

import java.util.List;

public interface LessonInfoRepository extends BaseRepository<LessonInfoEntity, Long>{

    @Query(value="select * from lesson_info where lesson_id = ?1", nativeQuery = true)
    List<LessonInfoEntity> getByLessonId(int lessonId);
}
