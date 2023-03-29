package vn.project.affiliate.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentPurchaseInfoResponse {

    private long total;
    private int courseCompleted;
    private int courseBought;

}
