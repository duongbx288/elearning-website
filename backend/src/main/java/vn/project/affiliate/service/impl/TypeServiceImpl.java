package vn.project.affiliate.service.impl;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import vn.project.affiliate.entity.TypeEntity;
import vn.project.affiliate.entity.UserEntity;
import vn.project.affiliate.repository.TypeRepository;
import vn.project.affiliate.service.TypeService;
import vn.project.affiliate.service.UserService;

import java.util.List;

@Slf4j
@Service
public class TypeServiceImpl extends BaseServiceImpl<TypeEntity, Long> implements TypeService {

    private final TypeRepository repository;

    public TypeServiceImpl(TypeRepository typeRepository){
        super(typeRepository);
        this.repository = typeRepository;
    }

//    @Override
//    public List<TypeEntity> getAll(){
//        var list = getAll();
//        return list;
//    }

    @Override
    public TypeEntity getById(int id){
        var list = repository.getById(id);
        return list;
    }
}
