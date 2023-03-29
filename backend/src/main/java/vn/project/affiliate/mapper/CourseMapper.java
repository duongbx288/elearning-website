package vn.project.affiliate.mapper;
import org.mapstruct.Mapper;
import vn.project.affiliate.dto.CourseDTO;
import vn.project.affiliate.entity.CourseEntity;

@Mapper(componentModel = "spring")
public interface CourseMapper extends EntityMapper<CourseDTO, CourseEntity> {
}
