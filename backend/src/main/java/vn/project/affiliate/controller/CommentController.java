package vn.project.affiliate.controller;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.project.affiliate.dto.CommentDTO;
import vn.project.affiliate.entity.CommentEntity;
import vn.project.affiliate.service.CommentService;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/comment")
public class CommentController {
    private final CommentService commentService;

    @GetMapping("")
    public ResponseEntity<List<CommentEntity>> getAll() {
        var list = commentService.getAll();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/course-id={id}")
    public ResponseEntity<List<CommentDTO>> getByCourseId(@PathVariable("id") int id){
        try {
            var list = commentService.getByCourseId(id);
            return ResponseEntity.ok(list);
        } catch (Exception e){
            log.error(e.toString());
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}
