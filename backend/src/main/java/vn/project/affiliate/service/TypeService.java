package vn.project.affiliate.service;

import vn.project.affiliate.entity.TypeEntity;

import java.util.List;

public interface TypeService extends BaseService<TypeEntity, Long> {

//    List<TypeEntity> getAll();

    TypeEntity getById(int id);
}
