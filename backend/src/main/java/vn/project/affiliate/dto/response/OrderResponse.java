package vn.project.affiliate.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {

    private int id;
    private Integer userId;
    private Integer courseId;
    private Integer affiliateId;
    private Integer initialSum;
    private Integer discount;
    private Integer total;
    private String status;
    private Instant createdDate;
    private Instant lastModifiedDate;
    private String createdBy;
    private String lastModifiedBy;
}
