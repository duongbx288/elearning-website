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
@Table(name="teacher")
public class TeacherEntity extends BaseEntity{

//    @NotNull
    @Column(name="teacher_code")
    private String teacherCode;

    @Column(name="name")
    private String name;

    @Column(name="birth_date")
    private Date birth_date;

    @Column(name="email")
    private String email;

    @Column(name="phone_number")
    private String phoneNumber;

    @Column(name="address")
    private String address;

    @Column(name="city")
    private String city;

    @Column(name="status")
    private String status;

    @Column(name="avatar")
    private String avatar;

    @Column(name="title")
    private String title;

    @Column(name="description")
    private String description;
}
