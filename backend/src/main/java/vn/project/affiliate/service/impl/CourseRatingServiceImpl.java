package vn.project.affiliate.service.impl;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.project.affiliate.dto.CourseRatingDTO;
import vn.project.affiliate.entity.CourseRatingEntity;
import vn.project.affiliate.mapper.CourseRatingMapper;
import vn.project.affiliate.repository.CourseRatingRepository;
import vn.project.affiliate.repository.CourseRepository;
import vn.project.affiliate.repository.StudentRepository;
import vn.project.affiliate.repository.UserAccountRepository;
import vn.project.affiliate.service.CourseRatingService;
import vn.project.affiliate.service.CourseService;

import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.time.Instant;
import java.util.List;

@Slf4j
@Service
public class CourseRatingServiceImpl extends BaseServiceImpl<CourseRatingEntity, Long> implements CourseRatingService {
    private final CourseRatingRepository courseRatingRepository;
    private final CourseRatingMapper courseRatingMapper;
    private final UserAccountRepository userAccountRepository;
    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;
    private final CourseService courseService;

    public CourseRatingServiceImpl(CourseRatingRepository courseRatingRepository, CourseRatingMapper courseRatingMapper
        ,UserAccountRepository userAccountRepository, StudentRepository studentRepository
        ,CourseRepository courseRepository, CourseService courseService){
        super(courseRatingRepository);
        this.courseRatingRepository = courseRatingRepository;
        this.courseRatingMapper = courseRatingMapper;
        this.userAccountRepository = userAccountRepository;
        this.studentRepository = studentRepository;
        this.courseRepository = courseRepository;
        this.courseService = courseService;
    }

    @Override
    public Page<CourseRatingDTO> getByCourseIdPag(int id, int pageNum){
        Pageable pageable = PageRequest.of(pageNum, 5);
        var list = courseRatingRepository.findByCourseId(id, pageable);
        Page<CourseRatingDTO> pages = list.map(rating -> {
            var ratingDTO = courseRatingMapper.toDto(rating);
            if (rating.getStudentId() != null) {
                var studentInfo = studentRepository.getById(Long.valueOf(rating.getStudentId()));
                ratingDTO.setAvatar(studentInfo.getAvatar());
                ratingDTO.setName(studentInfo.getName());
            }
            return ratingDTO;
        });
        return pages;
    }

    @Override
    public CourseRatingDTO getByStudentAndCourseId(int stuId, int courseId){
        var rating = courseRatingRepository.findByStudentIdAndAndCourseId(stuId, courseId);
        return courseRatingMapper.toDto(rating);
    }

    @Override
    public List<CourseRatingDTO> getByCourseId(int id){
        var list = courseRatingRepository.findByCourseId(id);
        var dto = courseRatingMapper.toDto(list);
        for (CourseRatingDTO rating: dto) {
            try {
//                var userAccount = userAccountRepository.getByUserId(rating.getUserId());
                if (rating.getStudentId() != null) {
                    var studentInfo = studentRepository.getById(Long.valueOf(rating.getStudentId()));
                    rating.setAvatar(studentInfo.getAvatar());
                    rating.setName(studentInfo.getName());
                }
            } catch (Exception e){
                log.error(e.toString());
            }
        }
        return dto;
    }

//    @Override
//    public CourseRatingDTO getById(Integer id){
//        var courseRating = courseRatingRepository.getById(id);
//        return courseRatingMapper.toDto(courseRating);
//    }

    @Override
    @Transactional
    public CourseRatingDTO createCourseRating(CourseRatingDTO dto) {
        var courseId = dto.getCourseId();
        dto.setCreatedDate(Instant.now());
        dto.setLastModifiedDate(Instant.now());
        var newRating = save(courseRatingMapper.toEntity(dto));
        var courseRatings = courseRatingRepository.findByCourseId(Math.toIntExact(dto.getCourseId()));
        var courseInfo = courseRepository.getById(courseId);
        if (courseRatings.size() > 0) {
            double result = 0;
            for (int i = 0; i < courseRatings.size(); i++) {
                result = result + courseRatings.get(i).getValue();
            }
            result = result / courseRatings.size();
            DecimalFormat df = new DecimalFormat("#.#");
            df.setRoundingMode(RoundingMode.CEILING);
            courseInfo.setRating(Double.valueOf(df.format(result)));
            courseService.save(courseInfo);
        }
        return courseRatingMapper.toDto(newRating);
    }
}
