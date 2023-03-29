package vn.project.affiliate.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.Entity;
import javax.persistence.Column;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="course_rating")
public class CourseRatingEntity extends BaseEntity{

    @Column(name="course_id")
    private Integer courseId;

    @Column(name="student_id")
    private Integer studentId;

    @Column(name="content")
    private String content;

    @Column(name="value")
    private Integer value;

    @Column(name="status")
    private String status;

}
