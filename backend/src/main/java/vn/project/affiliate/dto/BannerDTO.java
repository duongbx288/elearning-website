package vn.project.affiliate.dto;

import java.io.Serializable;
import java.time.Instant;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BannerDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    private Long id;
    private String code;
    private String title;
    private String url;
    private String imgUrl;
    private String type;
    private Short popUp;
    private Short modal;
    private Integer width;
    private Integer height;
    private String bannerWidth;
    private String createdBy;
    private String lastModifiedBy;
    private Instant createdDate;
    private Instant lastModifiedDate;
    private Long bannerMappingId;
    private Integer percentage;
    private String page;
    private String website;

}
