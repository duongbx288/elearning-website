package vn.project.affiliate.service.impl;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.project.affiliate.repository.BaseRepository;
import vn.project.affiliate.entity.BaseEntity;
import vn.project.affiliate.service.BaseService;

@Slf4j
@RequiredArgsConstructor
@Service
public abstract class BaseServiceImpl<E extends BaseEntity, I extends Serializable> implements BaseService<E, I> {
    private final BaseRepository<E, I> baseRepository;

    @Override
    public E save(E entity) {
        return baseRepository.save(entity);
    }

    @Override
    public List<E> saveAll(Iterable<E> entities) {
        return baseRepository.saveAll(entities);
    }

    @Override
    public Page<E> findAll(Pageable pageable) {
        return baseRepository.findAll(pageable);
    }

    @Override
    public List<E> findAll() { return baseRepository.findAll(); }

    @Override
    public Optional<E> findById(I id) {
        return baseRepository.findById(id);
    }

    @Override
    public List<E> getAll() {
        return baseRepository.findAll();
    }

    @Override
    public List<E> findAllById(Iterable<I> ids) {
        return baseRepository.findAllById(ids);
    }

    @Override
    public void deleteById(I id) {
        baseRepository.deleteById(id);
    }

    @Override
    public void delete(E entity) {
        baseRepository.delete(entity);
    }

    @Override
    public void deleteAllById(Iterable<I> ids) {
        baseRepository.deleteAllById(ids);
    }

    @Override
    public void deleteAll(Iterable<E> entities) {
        baseRepository.deleteAll(entities);
    }
}
