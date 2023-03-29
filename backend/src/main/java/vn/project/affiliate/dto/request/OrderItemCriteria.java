package vn.project.affiliate.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class OrderItemCriteria {

    private int limit = 5;
    private int page = 0;

    private Integer affiliateId;
    private Integer year;
    private Integer month;


}
