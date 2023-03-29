package vn.project.affiliate.mapper;

import org.mapstruct.Mapper;
import vn.project.affiliate.dto.UserAccountDTO;
import vn.project.affiliate.entity.UserAccountEntity;

@Mapper(componentModel = "spring")
public interface UserAccountMapper extends EntityMapper<UserAccountDTO, UserAccountEntity> {
}
