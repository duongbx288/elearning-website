package vn.project.affiliate.repository;

import org.springframework.data.jpa.repository.Query;
import vn.project.affiliate.entity.CommentEntity;

import java.util.List;

public interface CommentRepository extends BaseRepository<CommentEntity, Long> {

    @Query(value="select * from comment where id = ?1", nativeQuery = true)
    CommentEntity getById(Integer id);

    CommentEntity getByContent(String content);

    List<CommentEntity> getByCourseId(int id);
}
