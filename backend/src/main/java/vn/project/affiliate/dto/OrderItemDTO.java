package vn.project.affiliate.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.Instant;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemDTO implements Serializable{
    private static final long serialVersionUID = 1L;

    private Integer id;
    private Integer orderId;
    private Integer courseId;
    private Integer initPrice;
    private Integer discount;
    private Integer total;
    private Integer affiliateId;
    private String couponCode;
    private String studentName;
    private Instant createdDate;
    private Instant lastModifiedDate;
    private String courseName;
}
