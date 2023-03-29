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
public class CourseRequest {

    private int pageNum;
    private int pageLimit;
    private int id;
    private int teacherId;
    private String name;
    private String description;
    private String introduction;
    private Integer price;
    private String status;
    private int month;
    private int year;
    private int limit;
}
