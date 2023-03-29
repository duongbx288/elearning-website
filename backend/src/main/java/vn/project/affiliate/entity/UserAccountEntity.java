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
import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="user_account")
public class UserAccountEntity extends BaseEntity implements Serializable {

//    @Column(name="user_id")
//    private Integer userId;

//    @Size(max = 50)
//    @Column(name = "password", length = 50)
//    private String password;
//
    @Column(name = "email")
    private String email;

    @Column(name="username")
    private String username;

    @Column(name="student_id")
    private Integer studentId;

    @Column(name="teacher_id")
    private Integer teacherId;

    @Column(name="password")
    private String password;

    @Column(name="affiliate_id")
    private Integer affiliateId;

    @Column(name="status")
    private String status;

}
