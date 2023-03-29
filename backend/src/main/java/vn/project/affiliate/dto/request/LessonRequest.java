package vn.project.affiliate.dto.request;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LessonRequest {

    private int pageNum;
    private int pageLimit;
    private int id;
    private Integer courseId;
    private String name;
    private String videoLink;
    private String content;
    private String introduction;
    private String status;
    private int lessonNumber;
}
