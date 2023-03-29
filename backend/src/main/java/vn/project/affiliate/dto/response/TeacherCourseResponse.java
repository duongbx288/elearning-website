package vn.project.affiliate.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.project.affiliate.dto.CourseDTO;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TeacherCourseResponse {

    private int totalCourseBought;
    private int countCurrentWeek;
    private int countCurrentMonth;
    private int countCurrentYear;
    private int countChosenMonth;
    private List<CourseDTO> courseChosenMonth;
    private List<CourseDTO> courseWeek;
    private List<CourseDTO> courseMonth;
    private List<CourseDTO> courseYear;
}
