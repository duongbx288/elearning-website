package vn.project.affiliate.repository;

import org.springframework.data.jpa.repository.Query;
import vn.project.affiliate.entity.TeacherEntity;
import vn.project.affiliate.entity.TypeEntity;

public interface TypeRepository extends BaseRepository<TypeEntity, Long>{

    @Query(value="select * from type t where t.id = ?1", nativeQuery = true)
    TypeEntity getById(int id);
}
