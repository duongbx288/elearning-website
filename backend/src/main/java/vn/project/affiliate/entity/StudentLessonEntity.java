package vn.project.affiliate.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="student_lesson")
public class StudentLessonEntity extends BaseEntity{

    @Column(name="student_id")
    private Integer studentId;

    @Column(name="lesson_id")
    private Integer lessonId;

    @Column(name="status")
    private String status;
}
