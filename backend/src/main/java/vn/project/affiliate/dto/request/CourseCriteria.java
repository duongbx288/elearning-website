package vn.project.affiliate.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Min;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class CourseCriteria {

    private String query;

    @Min(5)
    private int limit = 5;

    @Min(0)
    private int page = 0;

    private Integer studentId;
    private List<Integer> listCourseId;
    private List<Integer> typeId;
    private List<Integer> boughtCourseId;

    private String name;

    private String sortBy;
    private String sort;// descend or ascend

    private Integer rating;

    @Min(0)
    private Integer maxPrice;

    @Min(0)
    private Integer minPrice;

    private Date createdDate;

    private List<Integer> teacherId;

    private boolean hotSeller;

}
