package vn.project.affiliate.dto;
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
public class AffiliateDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String affiliateCode;
    private String name;
    private Date birthDate;
    private String avatar;
    private String address;
    private Long phoneNumber;
    private String facebook;
    private String email;
    private String status;
    private String username;
}
