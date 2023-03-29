package vn.project.affiliate.mapper;

import org.mapstruct.Mapper;
import vn.project.affiliate.dto.AffiliateDTO;
import vn.project.affiliate.entity.AffiliateEntity;

@Mapper(componentModel = "spring")
public interface AffiliateMapper extends EntityMapper<AffiliateDTO, AffiliateEntity> {
}
