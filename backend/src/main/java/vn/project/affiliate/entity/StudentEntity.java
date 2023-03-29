package vn.project.affiliate.entity;

import java.io.Serializable;
import java.util.Date;

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
@Table(name="student")
public class StudentEntity extends BaseEntity implements Serializable {
    private static final long serialVersionUID = 2L;

    @Column(name="student_code")
    private String studentCode;

    @Column(name="name")
    private String name;

    @Column(name="birth_date")
    private Date birthDate;

    @Column(name="email")
    private String email;

    @Column(name="address")
    private String address;

    @Column(name="city")
    private String city;

    @Column(name="status")
    private String status;

    @Column(name="gender")
    private String gender;

    @Column(name="avatar")
    private String avatar;


}
