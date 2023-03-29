package vn.project.affiliate.controller;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import vn.project.affiliate.dto.CourseRatingDTO;
import vn.project.affiliate.entity.CourseRatingEntity;
import vn.project.affiliate.service.CourseRatingService;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/course_rating")
public class CourseRatingController {

    private final CourseRatingService courseRatingService;

    @GetMapping("")
    public ResponseEntity<List<CourseRatingEntity>> getAll(){
        var list = courseRatingService.getAll();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/course-id={id}")
    public ResponseEntity<List<CourseRatingDTO>> getByCourseId(@PathVariable("id") int id){
        try {
            var list = courseRatingService.getByCourseId(id);
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            log.error(e.toString());
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/pag/course-id={id}/pageNum={pageNum}")
    public ResponseEntity<Page<CourseRatingDTO>> getByCourseId(@PathVariable("id") int id, @PathVariable("pageNum") int pageNum){
        try {
            var list = courseRatingService.getByCourseIdPag(id, pageNum);
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            log.error(e.toString());
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/course-id={cid}/student-id={id}")
    public ResponseEntity<CourseRatingDTO> getByStudentAndCourseId(@PathVariable("cid") int courseId, @PathVariable("id") int studentId) {
        try {
            var rating = courseRatingService.getByStudentAndCourseId(studentId, courseId);
            return ResponseEntity.ok(rating);
        } catch (Exception e) {
            log.error(e.toString());
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/create")
    public ResponseEntity createCourseRating(@RequestBody @Valid CourseRatingDTO dto) {
        try {
            var result = courseRatingService.createCourseRating(dto);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            log.error(e.toString());
            return new ResponseEntity(null, HttpStatus.BAD_REQUEST);
        }
    }

}
