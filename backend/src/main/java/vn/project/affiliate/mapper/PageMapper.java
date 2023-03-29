package vn.project.affiliate.mapper;


import org.mapstruct.Mapper;
import vn.project.affiliate.dto.PageDTO;
import vn.project.affiliate.entity.PageEntity;

@Mapper(componentModel = "spring")
public interface PageMapper extends EntityMapper<PageDTO, PageEntity>{
}
