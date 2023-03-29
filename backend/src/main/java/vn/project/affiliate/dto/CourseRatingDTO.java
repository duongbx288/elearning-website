package vn.project.affiliate.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.Instant;
import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CourseRatingDTO implements Serializable{
    private static final long serialVersionUID = 1L;

    private Integer courseId;
    private Integer userId;
    private String content;
    private Integer value;
    private String status;
    private String name;
    private String avatar;
    private Instant createdDate;
    private Instant lastModifiedDate;
    private Integer studentId;
}
