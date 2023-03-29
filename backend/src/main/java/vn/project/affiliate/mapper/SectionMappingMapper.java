package vn.project.affiliate.mapper;

import org.mapstruct.Mapper;
import vn.project.affiliate.dto.SectionMappingDTO;
import vn.project.affiliate.entity.SectionMapping;

@Mapper(componentModel = "spring")
public interface SectionMappingMapper extends EntityMapper<SectionMappingDTO, SectionMapping>{
}
