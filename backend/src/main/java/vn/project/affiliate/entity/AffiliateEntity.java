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
@Table(name="affiliate")
public class AffiliateEntity extends BaseEntity{

    @Column(name="affiliate_code")
    private String affiliateCode;

    @Column(name="name")
    private String name;

    @Column(name="birth_date")
    private Date birthDate;

    @Column(name="avatar")
    private String avatar;

    @Column(name="address")
    private String address;

    @Column(name="phone_number")
    private Long phoneNumber;

    @Column(name="facebook")
    private String facebook;

    @Column(name="email")
    private String email;

    @Column(name="status")
    private String status;
}
