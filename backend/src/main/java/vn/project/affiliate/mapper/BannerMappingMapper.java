package vn.project.affiliate.mapper;

import org.mapstruct.Mapper;
import vn.project.affiliate.dto.BannerMappingDTO;
import vn.project.affiliate.entity.BannerMapping;

@Mapper(componentModel = "spring")
public interface BannerMappingMapper extends EntityMapper<BannerMappingDTO, BannerMapping>{
}
