package vn.project.affiliate.service;

import vn.project.affiliate.dto.CommentDTO;
import vn.project.affiliate.entity.CommentEntity;

import java.util.List;

public interface CommentService extends BaseService<CommentEntity, Long>{
    List<CommentEntity> getAll();
    CommentDTO getById(Integer id);

    List<CommentDTO> getByCourseId(int id);
}
