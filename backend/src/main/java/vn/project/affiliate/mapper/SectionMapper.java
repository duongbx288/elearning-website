package vn.project.affiliate.mapper;

import org.mapstruct.Mapper;
import vn.project.affiliate.dto.SectionDTO;
import vn.project.affiliate.entity.Section;

@Mapper(componentModel = "spring")
public interface SectionMapper extends EntityMapper<SectionDTO, Section>{
}
