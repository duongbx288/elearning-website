package vn.project.affiliate.dto.request;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrdersRequest {

    private int pageNum;
    private int pageLimit;
    private int id;
    private int userId;
    private int courseId;
    private int affiliateId;
    private int initialSum;
    private int discount;
    private int total;
    private int month;
    private int year;
    private String status;
    private Instant createdDate;
    private Instant lastModifiedDate;
    private String createdBy;
    private String lastModifiedBy;

}
