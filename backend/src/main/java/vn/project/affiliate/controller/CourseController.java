package vn.project.affiliate.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.relational.core.sql.In;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import vn.project.affiliate.dto.CourseDTO;
import vn.project.affiliate.dto.TeacherDTO;
import vn.project.affiliate.dto.request.CourseCriteria;
import vn.project.affiliate.dto.request.CourseRequest;
import vn.project.affiliate.dto.response.CourseResponse;
import vn.project.affiliate.dto.response.TeacherCourseResponse;
import vn.project.affiliate.dto.response.TeacherResponse;
import vn.project.affiliate.entity.CourseEntity;
import vn.project.affiliate.service.CourseService;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/course")
public class CourseController {

    private final CourseService courseService;

    @GetMapping(value="/info/search")
    @ResponseBody
    public ResponseEntity searchCourses(@Valid CourseCriteria criteria){
        Page<CourseDTO> f = courseService.findCourses(criteria);
        return ResponseEntity.ok(f);
    }

    @GetMapping("/get-recommend")
    @ResponseBody
    public ResponseEntity getRecommendCourse(@Valid CourseCriteria criteria) {
        try {
            var recommendCourse = courseService.getRecommendCourse(criteria);
            return ResponseEntity.ok(recommendCourse);
        } catch (Exception e){
            log.error(e.toString());
            return new ResponseEntity(null, HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("/high-rating")
    public ResponseEntity getHighRatingCourse() {
        try {
            var courses = courseService.getTopRatingCourse();
            return ResponseEntity.ok(courses);
        } catch (Exception e) {
            log.error(e.toString());
            return new ResponseEntity(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/new")
    public ResponseEntity getNewestCourse() {
        try {
            var courses = courseService.findNewestCourse();
            return ResponseEntity.ok(courses);
        } catch (Exception e) {
            log.error(e.toString());
            return new ResponseEntity(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("")
    public ResponseEntity<List<CourseEntity>> getAll() {
        var list = courseService.getAll();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/count/{id}")
    public ResponseEntity<Integer> getStudentCount(@PathVariable("id")int id){
        try {
            var count = courseService.getStudentCount(id);
            return ResponseEntity.ok(count);
        } catch (Exception e){
            log.error(e.toString());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/top-course")
    public ResponseEntity<List<CourseDTO>> getTopCourse() {
        try {
            var list = courseService.getTopCourse(5);
            return ResponseEntity.ok(list);
        } catch (Exception e){
            log.error(e.toString());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/count-complete/{id}")
    public ResponseEntity<Integer> getStudentComplete(@PathVariable("id")int id){
        try {
            var count = courseService.getStudentComplete(id);
            return ResponseEntity.ok(count);
        } catch (Exception e){
            log.error(e.toString());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value="/pagination/pageNum={num}/pageLimit={limit}", method = {RequestMethod.GET})
    public ResponseEntity<Page<CourseDTO>> getAllPagination(@PathVariable("num")int num, @PathVariable("limit") int limit){
        try{
            var list = courseService.getAllPagination(num, limit);
            return ResponseEntity.ok(list);
        } catch (Exception e){
            log.error(e.toString());
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/course-info/{id}")
    public ResponseEntity<CourseResponse> getCourseInfo(@PathVariable("id") int id){
        try {
            var info = courseService.getCourseInfo(id);
            return ResponseEntity.ok(info);
        } catch (Exception e){
            log.error(e.toString());
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<CourseDTO> getById(@PathVariable("id") int id){
        try {
            var list = courseService.getById(id);
            return ResponseEntity.ok(list);
        } catch (Exception e){
            log.error(e.toString());
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/teacherId={id}")
    public ResponseEntity<List<CourseDTO>> getByTeacherId(@PathVariable("id") int id){
        try {
            var list = courseService.getByTeacherId(id);
            return ResponseEntity.ok(list);
        } catch (Exception e){
            log.error(e.toString());
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/course-sold/teacherId={id}/limit={limit}")
    public ResponseEntity<List<CourseDTO>> getTopCourseSoldByTeacherId(@PathVariable("id") int id, @PathVariable("limit") int limit){
        try{
            var list = courseService.getTopCourseSoldByTeacherId(id, limit);
            return ResponseEntity.ok(list);
        } catch (Exception e){
            log.error(e.toString());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/particular-month/teacher={id}/month={month}/year={year}/limit={limit}")
    public ResponseEntity<TeacherCourseResponse> getTopBoughtCourseInParticularMonth(
            @PathVariable("id") int id,
            @PathVariable("month") int month,
            @PathVariable("year") int year,
            @PathVariable("limit") int limit){
        try{
            var list = courseService.getTopBoughtCourseInParticularMonth(month, year, id, limit);
            return ResponseEntity.ok(list);
        } catch (Exception e){
            log.error(e.toString());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/recent-bought/teacher={id}/limit={limit}")
    public ResponseEntity<TeacherCourseResponse> getTopRecentCourseBought(@RequestBody @Valid CourseRequest request){
        try{
            var info = courseService.getTopRecentCourseBought(request.getTeacherId(), request.getLimit());
            return ResponseEntity.ok(info);
        } catch (Exception e){
            log.error(e.toString());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/create")
    public ResponseEntity createCourse(@RequestBody @Valid CourseDTO courseDTO) {
        try {
            var result = courseService.createCourse(courseDTO);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            log.error(e.toString());
            return new ResponseEntity(null, HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value="/update-status", method={RequestMethod.PUT})
    public ResponseEntity<String> updateCourseInfo(@RequestBody @Valid CourseRequest request){
        String result = "";
        try {
            result = courseService.updateStatus((int) request.getId(), request.getStatus());
        } catch (Exception e){
            log.error(e.toString());
            return new ResponseEntity<>(e.toString(), HttpStatus.BAD_GATEWAY);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping(value="/delete", method={RequestMethod.PUT})
    public ResponseEntity<String> deleteTeacher(@RequestBody @Valid CourseRequest request){
        String result = "";
        try {
            result = courseService.deleteCourse((int) request.getId());
        } catch (Exception e) {
            log.error(e.toString());
            return new ResponseEntity<>(e.toString(), HttpStatus.BAD_GATEWAY);
        }
        return ResponseEntity.ok(result);
    }

    @RequestMapping(value="/update", method={RequestMethod.PUT})
    public ResponseEntity<String> updateStudent(@RequestBody @Valid CourseDTO dto){
        String result = "";
        try {
            result = courseService.updateCourse(dto);
        } catch (Exception e){
            log.error(e.toString());
            return new ResponseEntity<>(e.toString(), HttpStatus.BAD_GATEWAY);
        }

        return ResponseEntity.ok(result);
    }
}
