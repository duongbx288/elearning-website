package vn.project.affiliate.mapper;
import org.mapstruct.Mapper;
import vn.project.affiliate.dto.LessonDTO;
import vn.project.affiliate.entity.LessonEntity;

@Mapper(componentModel = "spring")
public interface LessonMapper extends EntityMapper<LessonDTO, LessonEntity> {
}
