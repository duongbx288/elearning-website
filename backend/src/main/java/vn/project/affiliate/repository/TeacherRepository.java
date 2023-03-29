package vn.project.affiliate.repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import vn.project.affiliate.entity.TeacherEntity;

import java.util.List;

public interface TeacherRepository extends BaseRepository<TeacherEntity, Long> {

    @Query(value="select * from teacher where id = ?1", nativeQuery = true)
    TeacherEntity getById(Integer id);

    @Query(value="select * from teacher where teacher_code = ?1 and id not like ?2", nativeQuery = true)
    List<TeacherEntity> findByCodeNotSameId(String code, int id);

    @Modifying
    @Transactional
    @Query(value="update teacher t set t.status = ?1 where t.id = ?2", nativeQuery = true)
    void updateStatus(String status, int id);

    @Modifying
    @Transactional
    @Query(value="update teacher s set s.status = 'deleted' where s.id = ?1", nativeQuery = true)
    void deleteTeacher(int id);
}
