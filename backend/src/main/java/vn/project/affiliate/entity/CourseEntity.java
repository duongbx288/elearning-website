package vn.project.affiliate.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="course")
public class CourseEntity extends BaseEntity{

    @Column(name="teacher_id")
    private Integer teacherId;

    @Column(name="name")
    private String name;

    @Column(name="description")
    private String description;

    @Column(name="introduction")
    private String introduction;

    @Column(name="price")
    private Integer price;

    @Column(name="status")
    private String status;

    @Column(name="type_id")
    private Integer typeId;

    @Column(name="cover")
    private String cover;

    @Column(name="link")
    private String link;

    @Column(name="rating")
    private Double rating;
}
