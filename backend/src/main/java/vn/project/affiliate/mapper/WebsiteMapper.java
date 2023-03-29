package vn.project.affiliate.mapper;

import org.mapstruct.Mapper;
import vn.project.affiliate.dto.WebsiteDTO;
import vn.project.affiliate.entity.WebsiteEntity;

@Mapper(componentModel = "spring")
public interface WebsiteMapper extends EntityMapper<WebsiteDTO, WebsiteEntity> {

}
