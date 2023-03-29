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
public class BannerResponse {
    private static final long serialVersionUID = 1L;
    private Long id;
    private String divId;
    private String pageUrl;
    private String code;
    private String title;
    private String imgUrl;
    private String url;
    private String type;
    private Short popUp;
    private Short modal;
    private Integer timeHidePopUp;
    private Integer numberHidePopUp;
    private Integer width;
    private Integer height;
    private String bannerWidth;
    private Short modeHideSection;
    private Integer timeHideSection;
    private Integer numberHideSection;
    private String position;
    private String positionValue;
    private String positionType;
}
