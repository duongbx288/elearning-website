package vn.project.affiliate.mapper;
import org.mapstruct.Mapper;
import vn.project.affiliate.dto.StudentCourseDTO;
import vn.project.affiliate.entity.StudentCourseEntity;

@Mapper(componentModel = "spring")
public interface StudentCourseMapper extends EntityMapper<StudentCourseDTO, StudentCourseEntity> {
}
