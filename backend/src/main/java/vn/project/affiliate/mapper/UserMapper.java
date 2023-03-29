package vn.project.affiliate.mapper;

import org.mapstruct.Mapper;
import vn.project.affiliate.dto.request.LoginRequest;
import vn.project.affiliate.entity.UserEntity;

@Mapper(componentModel = "spring")
public interface UserMapper extends EntityMapper<LoginRequest, UserEntity>{
}
