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
@Table(name="order_items")
public class OrderItemEntity extends BaseEntity {

    @Column(name="order_id")
    private Integer orderId;

    @Column(name="course_id")
    private Integer courseId;

    @Column(name="init_price")
    private Integer initPrice;

    @Column(name="discount")
    private Integer discount;

    @Column(name="total")
    private Integer total;

    @Column(name="coupon_code")
    private String couponCode;

    @Column(name="affiliate_id")
    private Integer affiliateId;

}
