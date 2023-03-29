package vn.project.affiliate.mapper;
import org.mapstruct.Mapper;
import org.w3c.dom.Entity;
import vn.project.affiliate.dto.CourseRatingDTO;
import vn.project.affiliate.entity.CourseRatingEntity;

@Mapper(componentModel = "spring")
public interface CourseRatingMapper extends EntityMapper<CourseRatingDTO, CourseRatingEntity> {
}
