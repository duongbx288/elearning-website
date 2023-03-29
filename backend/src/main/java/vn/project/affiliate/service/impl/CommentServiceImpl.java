package vn.project.affiliate.service.impl;

import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;
import vn.project.affiliate.dto.CommentDTO;
import vn.project.affiliate.entity.CommentEntity;
import vn.project.affiliate.mapper.AffiliateMapper;
import vn.project.affiliate.mapper.CommentMapper;
import vn.project.affiliate.repository.CommentRepository;
import vn.project.affiliate.service.CommentService;

import javax.xml.stream.events.Comment;
import java.util.List;

@Slf4j
@Service
public class CommentServiceImpl extends BaseServiceImpl<CommentEntity, Long> implements CommentService {
    private final CommentRepository commentRepository;
    private final CommentMapper commentMapper;

    public CommentServiceImpl(CommentRepository commentRepository, CommentMapper commentMapper) {
        super(commentRepository);
        this.commentMapper = commentMapper;
        this.commentRepository = commentRepository;
    }

    @Override
    public CommentDTO getById(Integer id) {
        var comment = commentRepository.getById(id);
        return commentMapper.toDto(comment);
    }

    @Override
    public List<CommentDTO> getByCourseId(int id){
        var list = commentRepository.getByCourseId(id);
        return commentMapper.toDto(list);
    }

}
