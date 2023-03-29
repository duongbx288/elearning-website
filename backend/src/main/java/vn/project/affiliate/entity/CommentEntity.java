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
@Table(name="comments")
public class CommentEntity extends BaseEntity {

    @Column(name="lesson_id")
    private Integer lessonId;

    @Column(name="course_id")
    private Integer courseId;

    @Column(name="user_id")
    private Integer userId;

    @Column(name="content")
    private String content;

    @Column(name="status")
    private String status;
}
