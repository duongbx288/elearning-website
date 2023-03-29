package vn.project.affiliate.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.project.affiliate.dto.StudentDTO;
import vn.project.affiliate.dto.request.StudentRequest;
import vn.project.affiliate.dto.response.StudentPurchaseInfoResponse;
import vn.project.affiliate.dto.response.StudentResponse;
import vn.project.affiliate.entity.StudentEntity;
import vn.project.affiliate.service.StudentService;

import javax.validation.Valid;
import java.lang.reflect.Array;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final StudentService studentService;

    @GetMapping("/{id}")
    public ResponseEntity<StudentDTO> findById(@PathVariable long id) {
        var studentDTO = studentService.getById(id);
        return ResponseEntity.ok(studentDTO);
    }


    @GetMapping("")
    public ResponseEntity<List<StudentEntity>> getAll() {
        var listStudent = studentService.getAll();
        return ResponseEntity.ok(listStudent);
    }

    @GetMapping("/get-sum/student-id={id}")
    public ResponseEntity<StudentPurchaseInfoResponse> getTotal(@PathVariable("id") int id){
        StudentPurchaseInfoResponse response = new StudentPurchaseInfoResponse();
        try {
            var sum = studentService.countSumPurchased(id);
            response.setTotal(sum);
            return ResponseEntity.ok(response);
        } catch(Exception e){
            log.error(e.toString());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/get-purchase-info/student-id={id}")
    public ResponseEntity<StudentPurchaseInfoResponse> getPurchaseInfo(@PathVariable("id") int id){
        StudentPurchaseInfoResponse response = new StudentPurchaseInfoResponse();
        try {
            var sum = studentService.countSumPurchased(id);
            var complete = studentService.countCoursesCompleted(id);
            var bought = studentService.countCoursesBought(id);
            response.setTotal(sum);
            response.setCourseBought(bought);
            response.setCourseCompleted(complete);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error(e.toString());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value="/pagination/pageNum={num}/pageLimit={limit}", method = {RequestMethod.GET})
    public ResponseEntity<Page<StudentDTO>> findPages(@PathVariable("num") int num, @PathVariable("limit") int limit){
        try {
            var list = studentService.findStudentPagination(num, limit);
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            log.error(e.toString());
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }


    @RequestMapping(value="/update-status", method={RequestMethod.PUT})
    public ResponseEntity<String> updateStudentInfo(@RequestBody @Valid StudentRequest request){
        String result = "";
        try {
            result = studentService.updateStatus(request.getId(), request.getStatus());
        } catch (Exception e){
            log.error(e.toString());
            return new ResponseEntity<>(e.toString(), HttpStatus.BAD_GATEWAY);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }


    @RequestMapping(value="/delete", method={RequestMethod.PUT})
    public ResponseEntity<String> deleteStudent(@RequestBody @Valid StudentRequest request){
        String result = "";
        try {
            result = studentService.deleteStudent(request.getId());
        } catch (Exception e) {
            log.error(e.toString());
            return new ResponseEntity<>(e.toString(), HttpStatus.BAD_GATEWAY);
        }
        return ResponseEntity.ok(result);
    }


    @RequestMapping(value="/update", method={RequestMethod.PUT})
    public ResponseEntity<String> updateStudent(@RequestBody @Valid StudentDTO studentDTO){
        try {
            boolean result = studentService.updateStudent(studentDTO);
            if (result) {
                return ResponseEntity.ok("Update successful!");
            } else {
                return new ResponseEntity<>("Error", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e){
            log.error(e.toString());
            return new ResponseEntity<>("Error occurs", HttpStatus.BAD_GATEWAY);
        }
    }
}
