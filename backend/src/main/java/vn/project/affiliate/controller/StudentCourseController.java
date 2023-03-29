package vn.project.affiliate.controller;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.project.affiliate.dto.StudentCourseDTO;
import vn.project.affiliate.entity.StudentCourseEntity;
import vn.project.affiliate.service.StudentCourseService;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/student_course")
public class StudentCourseController {

    private final StudentCourseService studentCourseService;

    @GetMapping("")
    public ResponseEntity<List<StudentCourseDTO>> getAll() {
        var list = studentCourseService.getAllStudentCourse();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/listCourse/student={id}")
    public ResponseEntity<List<Integer>> getListCourseIdByStudentId(@PathVariable("id") int id) {
        try {
            var list = studentCourseService.getListIdCourseByStudentId(id);
            return ResponseEntity.ok(list);
        } catch (Error e){
            log.error(e.toString());
            return new ResponseEntity<>(null, HttpStatus.BAD_GATEWAY);
        }
    }

    @GetMapping("/studentId={id}")
    public ResponseEntity<List<StudentCourseDTO>> getByStudentId(@PathVariable("id") int id) {
        try {
            var list = studentCourseService.getByStudentId(id);
            return ResponseEntity.ok(list);
        } catch (Error e){
            log.error(e.toString());
            return new ResponseEntity<>(null, HttpStatus.BAD_GATEWAY);
        }
    }

    @GetMapping("/studentId={id}/courseId={courseId}")
    public ResponseEntity<StudentCourseDTO> getByCourseAndStudentId(@PathVariable("id") int id, @PathVariable("courseId") int courseId) {
        try {
            var list = studentCourseService.getByStudentAndCourseId(id, courseId);
            return ResponseEntity.ok(list);
        } catch (Error e){
            log.error(e.toString());
            return new ResponseEntity<>(null, HttpStatus.BAD_GATEWAY);
        }
    }

}
