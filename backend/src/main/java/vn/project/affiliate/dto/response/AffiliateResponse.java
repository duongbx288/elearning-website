package vn.project.affiliate.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.project.affiliate.dto.OrdersDTO;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AffiliateResponse {

    private List<OrdersDTO> orders;
    private long countTotal;
}
