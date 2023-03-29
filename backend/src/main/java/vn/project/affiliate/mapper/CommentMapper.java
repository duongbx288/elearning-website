package vn.project.affiliate.mapper;
import org.mapstruct.Mapper;
import vn.project.affiliate.dto.CommentDTO;
import vn.project.affiliate.entity.CommentEntity;

@Mapper(componentModel = "spring")
public interface CommentMapper extends EntityMapper<CommentDTO, CommentEntity>{
}
