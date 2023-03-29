package vn.project.affiliate.service.impl;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import vn.project.affiliate.dto.StudentCourseDTO;
import vn.project.affiliate.entity.StudentCourseEntity;
import vn.project.affiliate.mapper.StudentCourseMapper;
import vn.project.affiliate.mapper.StudentMapper;
import vn.project.affiliate.repository.CourseRepository;
import vn.project.affiliate.repository.StudentCourseRepository;
import vn.project.affiliate.service.StudentCourseService;

import java.util.List;

@Slf4j
@Service
public class StudentCourseServiceImpl extends BaseServiceImpl<StudentCourseEntity, Long> implements StudentCourseService {
    private StudentCourseRepository studentCourseRepository;
    private StudentCourseMapper studentCourseMapper;
    private CourseRepository courseRepository;

    public StudentCourseServiceImpl(StudentCourseRepository studentCourseRepository, StudentCourseMapper studentCourseMapper, CourseRepository courseRepository){
        super(studentCourseRepository);
        this.studentCourseRepository = studentCourseRepository;
        this.studentCourseMapper = studentCourseMapper;
        this.courseRepository = courseRepository;
    }

    @Override
    public boolean createStudentCourse(int studentId, int courseId){
        try {
            StudentCourseEntity entity = new StudentCourseEntity();
            entity.setCourseId(courseId);
            entity.setStudentId(studentId);
            save(entity);
            return true;
        } catch (Exception e){
            log.error(e.toString());
            throw e;
        }
    }

    @Override
    public List<StudentCourseDTO> getAllStudentCourse() {
        var courses = getAll();
        return studentCourseMapper.toDto(courses);
    }

    public List<Integer> getListIdCourseByStudentId(int id){
        var listId = studentCourseRepository.getListIdByStudentId(id);
        return listId;
    }

    @Override
    public StudentCourseDTO getByStudentAndCourseId(int studentId, int courseId) {
        var studentCourse = studentCourseRepository.findByStudentIdAndAndCourseId(studentId, courseId);
        return studentCourseMapper.toDto(studentCourse);
    }

    @Override
    public List<StudentCourseDTO> getByStudentId(int id) {
        var courses = studentCourseRepository.findByStudentId(id);
        var coursesDTOs = studentCourseMapper.toDto(courses);
        for (StudentCourseDTO course: coursesDTOs) {
            var courseId = course.getCourseId();
            var courseInfo = courseRepository.getById(courseId);
            course.setCourseName(courseInfo.getName());
            course.setDescription(courseInfo.getDescription());
            course.setIntroduction(courseInfo.getIntroduction());
            course.setPrice(courseInfo.getPrice());
            course.setStatus(courseInfo.getStatus());
            course.setLink(courseInfo.getLink());
            course.setCover(courseInfo.getCover());
        }

        return coursesDTOs;
    }
}
