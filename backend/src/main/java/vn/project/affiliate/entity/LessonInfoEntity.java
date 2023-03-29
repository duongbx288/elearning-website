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
@Table(name="lesson_info")
public class LessonInfoEntity extends BaseEntity{

    @Column(name="name")
    private String name;

    @Column(name="lesson_id")
    private Integer lessonId;

    @Column(name="video_link")
    private String videoLink;

    @Column(name="content")
    private String content;

    @Column(name="introduction")
    private String introduction;

    @Column(name="start_number")
    private Integer startNumber;

    @Column(name="locked")
    private Integer locked;

}
