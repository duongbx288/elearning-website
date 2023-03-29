package vn.project.affiliate.repository;

import java.io.Serializable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;
import vn.project.affiliate.entity.BaseEntity;

@NoRepositoryBean
public interface BaseRepository<E extends BaseEntity, I extends Serializable> extends JpaRepository<E, I> {


}
