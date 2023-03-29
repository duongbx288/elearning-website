package vn.project.affiliate.mapper;

import org.mapstruct.Mapper;
import vn.project.affiliate.dto.BannerDTO;
import vn.project.affiliate.entity.Banner;

@Mapper(componentModel = "spring")
public interface BannerMapper extends EntityMapper<BannerDTO, Banner>{
}
