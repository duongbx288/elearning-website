package vn.project.affiliate.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import vn.project.affiliate.entity.LessonEntity;

import java.util.List;

public interface LessonRepository extends BaseRepository<LessonEntity, Long>{

    @Query(value="select * from lesson where id = ?1", nativeQuery = true)
    LessonEntity getById(int id);

    List<LessonEntity> getByCourseId(int id);

    Page<LessonEntity> findByCourseId(int id, Pageable pageable);

    @Modifying
    @Transactional
    @Query(value="update lesson t set t.status = ?1 where t.id = ?2", nativeQuery = true)
    void updateStatus(String status, int id);

    @Modifying
    @Transactional
    @Query(value="update lesson s set s.status = 'deleted' where s.id = ?1", nativeQuery = true)
    void deleteLesson(int id);
}
