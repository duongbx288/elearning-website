package vn.project.affiliate.mapper;
import org.mapstruct.Mapper;
import vn.project.affiliate.dto.TeacherDTO;
import vn.project.affiliate.entity.TeacherEntity;

@Mapper(componentModel = "spring")
public interface TeacherMapper extends EntityMapper<TeacherDTO, TeacherEntity> {
}
