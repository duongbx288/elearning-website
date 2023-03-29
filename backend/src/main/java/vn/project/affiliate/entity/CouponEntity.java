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
@Table(name="coupon")
public class CouponEntity extends BaseEntity{

    @Column(name="coupon_code")
    private String couponCode;

    @Column(name="affiliate_id")
    private Integer affiliateId;

    @Column(name="status")
    private String status;

    @Column(name="use_time")
    private Integer useTime;
}
