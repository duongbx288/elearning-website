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
public class SectionDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String divId;
    private Short mode;
    private String desc;
    private String code;
    private Short popUp;
    private Integer width;
    private Integer height;
    private String createdBy;
    private String lastModifiedBy;
    private Instant createdDate;
    private Instant lastModifiedDate;
    private short modeHide;
    private Integer timeHide;
    private Integer numberHide;
    private Long sectionMappingId;

}
