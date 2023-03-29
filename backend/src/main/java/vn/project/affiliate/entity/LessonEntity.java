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
@Table(name="lesson")
public class LessonEntity extends BaseEntity{

    @Column(name="course_id")
    private Integer courseId;

    @Column(name="name")
    private String name;

    @Column(name="content")
    private String content;

    @Column(name="introduction")
    private String introduction;

    @Column(name="status")
    private String status;

    @Column(name="lesson_num")
    private Integer lessonNumber;

    @Column(name="video_link")
    private String videoLink;

    @Column(name="locked")
    private String locked;
}
