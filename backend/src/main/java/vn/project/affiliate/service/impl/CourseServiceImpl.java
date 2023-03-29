package vn.project.affiliate.service.impl;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.project.affiliate.dto.CourseDTO;
import vn.project.affiliate.dto.LessonDTO;
import vn.project.affiliate.dto.request.CourseCriteria;
import vn.project.affiliate.dto.response.CourseResponse;
import vn.project.affiliate.dto.response.TeacherCourseResponse;
import vn.project.affiliate.entity.CourseEntity;
import vn.project.affiliate.mapper.CourseMapper;
import vn.project.affiliate.repository.CourseRatingRepository;
import vn.project.affiliate.repository.CourseRepository;
import vn.project.affiliate.repository.StudentCourseRepository;
import vn.project.affiliate.repository.TeacherRepository;
import vn.project.affiliate.service.CourseService;
import vn.project.affiliate.service.LessonService;

import java.text.DecimalFormat;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class CourseServiceImpl extends BaseServiceImpl<CourseEntity, Long> implements CourseService {
    private final CourseRepository courseRepository;
    private final CourseMapper courseMapper;
    private final TeacherRepository teacherRepository;
    private final CourseRatingRepository courseRatingRepository;
    private final StudentCourseRepository studentCourseRepository;
    private final LessonService lessonService;

    public CourseServiceImpl(CourseRepository courseRepository,
                             TeacherRepository teacherRepository, CourseRatingRepository courseRatingRepository,
                             CourseMapper courseMapper, StudentCourseRepository studentCourseRepository,
                             LessonService lessonService){
        super(courseRepository);
        this.courseRepository = courseRepository;
        this.courseMapper = courseMapper;
        this.teacherRepository = teacherRepository;
        this.courseRatingRepository = courseRatingRepository;
        this.studentCourseRepository = studentCourseRepository;
        this.lessonService = lessonService;
    }

    @Override
    public Page<CourseDTO> findCourses(CourseCriteria criteria){
//        List<CourseEntity> list = courseRepository.findCourses(criteria);
        Page<CourseEntity> list = courseRepository.findCourses(criteria);
        Page<CourseDTO> dtoList = list.map(item -> {
            CourseDTO dto = courseMapper.toDto(item);
            dto.setTeacherName(teacherRepository.getById(dto.getTeacherId()).getName());
            return dto;
        });
        return dtoList;
    }

    // May be used for update too
    @Override
    public boolean createCourse(CourseDTO courseDTO) {
        var courseEntity = courseMapper.toEntity(courseDTO);
        if (courseEntity.getCreatedDate() != null) {
        } else courseEntity.setCreatedDate(Instant.now());
        courseEntity.setCreatedDate(Instant.now());
        courseEntity.setLastModifiedDate(Instant.now());
        courseEntity.setStatus("active");
        var newCourse = save(courseEntity);
        var lessons = courseDTO.getLessons();
        for (LessonDTO dto: lessons) {
            dto.setCourseId(Math.toIntExact(newCourse.getId()));
        }
        if (!lessons.isEmpty()) {
            lessonService.createLesson(lessons);
        }

        return true;
    }

    @Override
    public List<CourseDTO> getRecommendCourse(CourseCriteria criteria) {
        var recommendedListCourseId = criteria.getListCourseId();
        var studentId = criteria.getStudentId();
        var listCourseBought = studentCourseRepository.getListIdByStudentId(studentId);
        var listStudentRated = courseRatingRepository.findByStudentId(studentId);
        // Nếu số lượng rating lớn hơn 3 thì sẽ gợi ý khóa học. Nếu không thì
        // Đưa ra các khóa học nổi bật
        // Lọc các khóa học người dùng đã học
        // Nếu lọc xong khóa học -> 0 thì lại đưa ra khóa học nổi bật
        if (listStudentRated.size() > 3) {
            if (!recommendedListCourseId.isEmpty()) {
                for (int i = 0; i < recommendedListCourseId.size(); i++) {
                    if (listCourseBought.contains(i)) {
                        recommendedListCourseId.remove((Integer) i);
                    }
                }
            }
            if (recommendedListCourseId.size() <= 0) {
                // Tim khoa hoc noi bat
                return getHighRatingCourse(listCourseBought);
            } else if (recommendedListCourseId.size() > 3){
                List<Integer> subList = new ArrayList<Integer>(recommendedListCourseId.subList(0, 4));
               var listCourse =  courseRepository.findCoursesIn(subList);
               return courseMapper.toDto(listCourse);
            } else {
                var listCourse =  courseRepository.findByIdIn(recommendedListCourseId);
                return courseMapper.toDto(listCourse);
            }
        } else {
            // Tim khoa hoc noi bat
            return getHighRatingCourse(listCourseBought);
        }
    }


    @Override
    public List<CourseDTO> getTopRatingCourse() {
        var courses = courseRepository.findTopRatingCourse();
        return courseMapper.toDto(courses);
    }

    @Override
    public List<CourseDTO> findNewestCourse() {
        var courses = courseRepository.findNewestCourse();
        return courseMapper.toDto(courses);
    }

    public List<CourseDTO> getHighRatingCourse(List<Integer> listCourseBought){
        if (listCourseBought.size() <= 0) {
            var highRating = courseRepository.findTopRatingCourse();
            return courseMapper.toDto(highRating);
        }
        else {
            var highRatingCourse = courseRepository.findTopRatingCourseAndNotLearned(listCourseBought);
            return courseMapper.toDto(highRatingCourse);
        }

    }

    @Override
    public CourseDTO getById(int id) {
        var course = courseRepository.getById(id);
        var teacherName = teacherRepository.getById(course.getTeacherId()).getName();
        var dto = courseMapper.toDto(course);
        dto.setTeacherName(teacherName);
        return dto;
    }

    @Override
    public int getStudentCount(int id){
        var count = courseRepository.getStudentCount(id);
        return count;
    }

    @Override
    public int getStudentComplete(int id){
        var count = courseRepository.getStudentComplete(id);
        return count;
    }

    @Override
    public CourseResponse getCourseInfo(int courseId){
        CourseResponse response = new CourseResponse();
        try {
            var info = courseMapper.toDto(courseRepository.getById(courseId));
            var studentCount = courseRepository.getStudentCount(courseId);
            var studentComplete = courseRepository.getStudentComplete(courseId);
            var courseRatings = courseRatingRepository.findByCourseId(info.getId());
            if (courseRatings.size() > 0) {
                int result = 0;
                for (int i = 0; i < courseRatings.size(); i++) {
                    result = result + courseRatings.get(i).getValue();
                }
                result = result / courseRatings.size();
                info.setRating((double) result);
                info.setRatingCount(courseRatings.size());
            }
            info.setTeacherName(teacherRepository.getById(info.getTeacherId()).getName());
            response.setCourse(info);
            response.setStudentCount(studentCount);
            response.setStudentComplete(studentComplete);
            return response;
        } catch (Exception e){
            log.error(e.toString());
            return response;
        }
    }


    @Override
    public List<CourseDTO> getTopCourse(int top) {
        var list = courseRepository.findTopCourse(top);
        var dto = courseMapper.toDto(list);
        List<CourseDTO> dtoLists = dto.stream().map(item -> {
            var studentCount = courseRepository.getStudentCount(Math.toIntExact(item.getId()));
            var teacherName = teacherRepository.getById(item.getTeacherId()).getName();
            var courseRatings = courseRatingRepository.findByCourseId(item.getId());
            item.setTeacherName(teacherName);
            item.setStudentCount(studentCount);
            return item;
        }).collect(Collectors.toList());
        return dtoLists;
    }

    @Override
    public Page<CourseDTO> getAllPagination(int pageNum, int pageLimit){
        Pageable pageable = PageRequest.of(pageNum, pageLimit);
        var list = findAll(pageable);
        Page<CourseDTO> pages = list.map(course -> {
            var courseDto = courseMapper.toDto(course);
            var studentCount = courseRepository.getStudentCount(Math.toIntExact(course.getId()));
            var teacherName = teacherRepository.getById(course.getTeacherId()).getName();
            var courseRatings = courseRatingRepository.findByCourseId(courseDto.getId());
            courseDto.setTeacherName(teacherName);
            return courseDto;
        });

        return pages;
    }

    @Override
    public List<CourseDTO> getByTeacherId(int id) {
        var list = courseRepository.findByTeacherId(id);
        var listdto = courseMapper.toDto(list);
        List<CourseDTO> dtoLists = listdto.stream().map(item -> {
            var studentCount = courseRepository.getStudentCount(Math.toIntExact(item.getId()));
            var teacherName = teacherRepository.getById(item.getTeacherId()).getName();
            item.setTeacherName(teacherName);
            item.setStudentCount(studentCount);
            return item;
        }).collect(Collectors.toList());
        return dtoLists;
    }

    @Override
    public List<CourseDTO> getCourseSoldByTeacherId(int id){
        var list = courseRepository.getCourseSoldByTeacherId(id);
        return courseMapper.toDto(list);
    }

    @Override
    public List<CourseDTO> getTopCourseSoldByTeacherId(int teacherId, int limit) {
        var list = courseRepository.getTopCourseSoldByTeacherId(teacherId, limit);
        return courseMapper.toDto(list);
    }

    @Override
    public TeacherCourseResponse getTopRecentCourseBought(int teacherId, int limit){
        TeacherCourseResponse info = new TeacherCourseResponse();
        try {
            var currWeek = courseMapper.toDto(courseRepository.getTopBoughtCourseWithinWeek(teacherId, limit));
            var currMonth = courseMapper.toDto(courseRepository.getTopBoughtCourseWithinMonth(teacherId, limit));
            var currYear = courseMapper.toDto(courseRepository.getTopBoughtCourseWithinYear(teacherId, limit));

            List<CourseDTO> week = currWeek.stream().map(item -> {
                int count = courseRepository.countCourseBoughtWithinWeek(item.getId());
                item.setBoughtCount(count);
                return item;
            }).collect(Collectors.toList());

            List<CourseDTO> month = currMonth.stream().map(item -> {
                int count = courseRepository.countCourseBoughtWithinMonth(item.getId());
                item.setBoughtCount(count);
                return item;
            }).collect(Collectors.toList());

            List<CourseDTO> year = currYear.stream().map(item -> {
                int count = courseRepository.countCourseBoughtWithinYear(item.getId());
                item.setBoughtCount(count);
                return item;
            }).collect(Collectors.toList());

            info.setCourseWeek(week);
            info.setCourseMonth(month);
            info.setCourseYear(year);
            return info;
        } catch (Exception e){
            log.error(e.toString());
            return info;
        }
    }

    @Override
    public TeacherCourseResponse getTopBoughtCourseInParticularMonth(int month, int year, int teacherId, int limit){
        TeacherCourseResponse info = new TeacherCourseResponse();
        try{
            var monthBought = courseMapper.toDto(courseRepository.getTopBoughtCourseInParticularMonth(month, year, teacherId, limit));
            List<CourseDTO> bought = monthBought.stream().map(item -> {
                int count = courseRepository.countCourseOfAnyMonth(month, year, item.getId());
                item.setBoughtCount(count);
                return item;
            }).collect(Collectors.toList());
            info.setCourseChosenMonth(bought);
            return info;
        }catch (Exception e){
            log.error(e.toString());
            return info;
        }
    }

    @Override
    public String updateCourse(CourseDTO dto) {
        try {
            CourseEntity course = courseMapper.toEntity(dto);
            save(course);
        } catch (Exception e) {
            log.error(e.toString());
            return e.toString();
        }

        return "Success";
    }

    @Override
    public String updateStatus(int id, String status) {
        try {
            courseRepository.updateStatus(status, id);
        } catch (Exception e){
            log.error(e.toString());
            return e.toString();
        }

        return "Success";
    }

    @Override
    public String deleteCourse(int id) {
        try {
            courseRepository.deleteCourse(id);
        } catch (Exception e){
            log.error(e.toString());
            return e.toString();
        }

        return "Success";
    }
}
