package vn.project.affiliate.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.Instant;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CourseDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private int id;
    private int teacherId;
    private String teacherName;
    private String name;
    private String description;
    private String introduction;
    private Long price;
    private String status;
    private Instant createdDate;
    private Instant lastModifiedDate;
    private String createdBy;
    private String lastModifiedBy;

    // bought and student Count may be the same
    private Integer boughtCount;
    private Integer studentCount;

    private Integer typeId;
    private String cover;
    private Double rating;
    private int ratingCount;
    private String link;
    private List<LessonDTO> lessons;
}
