package vn.project.affiliate.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CouponDTO {

    private String couponCode;
    private Integer affiliateId;
    private String status;
    private Integer useTime;
}
