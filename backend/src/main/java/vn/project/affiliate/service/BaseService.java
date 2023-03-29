package vn.project.affiliate.service;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import vn.project.affiliate.entity.BaseEntity;

public interface BaseService<E extends BaseEntity, I extends Serializable> {
    E save(E entity);
    List<E> saveAll(Iterable<E> entities);
    Page<E> findAll(Pageable pageable);
    List<E> findAll();
    Optional<E> findById(I id);
    List<E> getAll();
    List<E> findAllById(Iterable<I> ids);
    void deleteById(I id);
    void delete(E entity);
    void deleteAllById(Iterable<I> ids);
    void deleteAll(Iterable<E> entities);
}
