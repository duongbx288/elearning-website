package vn.project.affiliate.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.Instant;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BannerMappingDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    private Long id;
    private Long bannerId;
    private Long sectionId;
    private Long pageId;
    private Integer timeHide;
    private Integer numberHide;
    private String position;
    private String positionType;
    private String positionValue;
    private Integer percentage;
    private String createdBy;
    private String lastModifiedBy;
    private Instant createdDate;
    private Instant lastModifiedDate;
    private String title;
    private String imgUrl;
}
