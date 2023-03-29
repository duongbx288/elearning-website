package vn.project.affiliate.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentCourseDTO implements Serializable{
    private static final long serialVersionUID = 1L;

    private Integer studentId;
    private Integer courseId;
    private Integer lessonId;
    private Integer teacherId;
    private String courseName;
    private String description;
    private String introduction;
    private Integer price;
    private String status;
    private String cover;
    private String link;
}
