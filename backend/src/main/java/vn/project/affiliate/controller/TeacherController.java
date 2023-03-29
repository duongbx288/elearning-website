package vn.project.affiliate.controller;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.project.affiliate.dto.TeacherDTO;
import vn.project.affiliate.dto.response.TeacherResponse;
import vn.project.affiliate.entity.TeacherEntity;
import vn.project.affiliate.service.TeacherService;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/teacher")
public class TeacherController {

    private final TeacherService teacherService;

    @PostMapping("/add")
    public ResponseEntity registerTeacher(@RequestBody @Valid TeacherDTO dto) {
        try {
            var newTeacher = teacherService.registerTeacher(dto);
            return ResponseEntity.ok(newTeacher);
        } catch (Exception e) {
            log.error(e.toString());
            return new ResponseEntity(null, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("")
    public ResponseEntity<List<TeacherEntity>> getAll(){
        var list = teacherService.getAll();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/pagination/pageNum={num}/pageLimit={limit}")
    public ResponseEntity<Page<TeacherDTO>> getTeacher(@PathVariable("num") int num, @PathVariable("limit") int limit){
        var list = teacherService.getByPagination(num, limit);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TeacherDTO> findById(@PathVariable long id) {
        var teacherDTO = teacherService.getById((int) id);
        return ResponseEntity.ok(teacherDTO);
    }

    @RequestMapping(value="/update-status", method={RequestMethod.PUT})
    public ResponseEntity<String> updateTeacherInfo(@RequestBody @Valid TeacherResponse request){
        String result = "";
        try {
            result = teacherService.updateStatus((int) request.getId(), request.getStatus());
        } catch (Exception e){
            log.error(e.toString());
            return new ResponseEntity<>(e.toString(), HttpStatus.BAD_GATEWAY);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping(value="/delete", method={RequestMethod.PUT})
    public ResponseEntity<String> deleteTeacher(@RequestBody @Valid TeacherResponse request){
        String result = "";
        try {
            result = teacherService.deleteTeacher((int) request.getId());
        } catch (Exception e) {
            log.error(e.toString());
            return new ResponseEntity<>(e.toString(), HttpStatus.BAD_GATEWAY);
        }
        return ResponseEntity.ok(result);
    }

    @RequestMapping(value="/update", method={RequestMethod.PUT})
    public ResponseEntity<String> updateTeacher(@RequestBody @Valid TeacherDTO teacherDTO){
        String result = "";
        try {
            result = teacherService.updateTeacher(teacherDTO);
        } catch (Exception e){
            log.error(e.toString());
            return new ResponseEntity<>(e.toString(), HttpStatus.BAD_GATEWAY);
        }

        return ResponseEntity.ok(result);
    }
}
