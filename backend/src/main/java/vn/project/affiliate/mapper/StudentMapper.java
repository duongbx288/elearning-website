package vn.project.affiliate.mapper;

import org.mapstruct.Mapper;
import vn.project.affiliate.dto.StudentDTO;
import vn.project.affiliate.entity.StudentEntity;

@Mapper(componentModel = "spring")
public interface StudentMapper extends EntityMapper<StudentDTO, StudentEntity> {
}
