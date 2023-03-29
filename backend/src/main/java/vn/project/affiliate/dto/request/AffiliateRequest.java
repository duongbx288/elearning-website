package vn.project.affiliate.dto.request;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AffiliateRequest {

    private int pageNum;
    private int pageLimit;
    private int id;
    private String affiliateCode;
    private String name;
    private Date birthDate;
    private String avatar;
    private String address;
    private Integer phoneNumber;
    private String facebook;
    private String email;
}
