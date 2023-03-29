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
@Table(name="student_course")
public class StudentCourseEntity extends BaseEntity {

    @Column(name="student_id")
    private Integer studentId;

    @Column(name="course_id")
    private Integer courseId;

    @Column(name="lesson_id")
    private Integer lessonId;

}
