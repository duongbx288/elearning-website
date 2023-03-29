
package vn.project.affiliate.dto.request;
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
public class SectionMappingRequest implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;
    private Long pageId;
    private String sectionCode;
    private short modeHide;
    private Integer timeHide;
    private Integer numberHide;
    private Instant createdDate;
    private Instant lastModifiedDate;
    private String createdBy;
    private String lastModifiedBy;

}
