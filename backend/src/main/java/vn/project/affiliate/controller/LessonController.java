package vn.project.affiliate.controller;

import com.amazonaws.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import vn.project.affiliate.dto.LessonDTO;
import vn.project.affiliate.dto.TeacherDTO;
import vn.project.affiliate.dto.request.LessonRequest;
import vn.project.affiliate.dto.response.TeacherResponse;
import vn.project.affiliate.entity.LessonEntity;
import vn.project.affiliate.service.LessonService;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/lesson")
public class LessonController {

    private final LessonService lessonService;

    @GetMapping("")
    public ResponseEntity<List<LessonEntity>> getAll(){
        var list = lessonService.getAll();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/pagination/pageNum={num}/pageLimit={limit}")
    public ResponseEntity<Page<LessonDTO>> getPagination(@PathVariable("num") int num, @PathVariable("limit") int limit){
        var list = lessonService.getByPagination(num, limit);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LessonDTO> findById(@PathVariable long id) {
        var lesson = lessonService.getById((int) id);
        return ResponseEntity.ok(lesson);
    }

    @GetMapping("/courseId={id}")
    public ResponseEntity<List<LessonDTO>> findByCourseId(@PathVariable long id) {
        var lesson = lessonService.getByCourseId((int) id);
        return ResponseEntity.ok(lesson);
    }

    @RequestMapping(value="/update-status", method={RequestMethod.PUT})
    public ResponseEntity<String> updateLessonInfo(@RequestBody @Valid LessonRequest request){
        String result = "";
        try {
            result = lessonService.updateStatus((int) request.getId(), request.getStatus());
        } catch (Exception e){
            log.error(e.toString());
            return new ResponseEntity<>(e.toString(), HttpStatus.BAD_GATEWAY);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping(value="/delete", method={RequestMethod.PUT})
    public ResponseEntity<String> deleteLesson(@RequestBody @Valid LessonRequest request){
        String result = "";
        try {
            result = lessonService.deleteLesson((int) request.getId());
        } catch (Exception e) {
            log.error(e.toString());
            return new ResponseEntity<>(e.toString(), HttpStatus.BAD_GATEWAY);
        }
        return ResponseEntity.ok(result);
    }

    @RequestMapping(value="/update", method={RequestMethod.PUT})
    public ResponseEntity<String> updateLesson(@RequestBody @Valid LessonDTO dto){
        String result = "";
        try {
            result = lessonService.updateLesson(dto);
        } catch (Exception e){
            log.error(e.toString());
            return new ResponseEntity<>(e.toString(), HttpStatus.BAD_GATEWAY);
        }

        return ResponseEntity.ok(result);
    }
}
