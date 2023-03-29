package vn.project.affiliate.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "section_mapping")
public class SectionMapping extends BaseEntity implements Serializable {
    private static final long serialVersionUID = 1L;

    @NotNull
    @Column(name = "page_id", nullable = false)
    private Long pageId;

    @NotNull
    @Column(name = "section_id", nullable = false)
    private Long sectionId;

    @NotNull
    @Column(columnDefinition = "0", name = "mode_hide")
    private Short modeHide;

    @NotNull
    @Column(name = "time_hide", columnDefinition = "0")
    private Integer timeHide;

    @NotNull
    @Column(name = "number_hide", columnDefinition = "0")
    private Integer numberHide;

    public SectionMapping(Long id, Long pageId, Long sectionId, short modeHide,Integer timeHide, Integer numberHide, String createdBy, String lastModifiedBy) {
        super(id);
        this.pageId = pageId;
        this.sectionId = sectionId;
        this.timeHide = timeHide;
        this.modeHide = modeHide;
        this.numberHide = numberHide;
        this.setCreatedBy(createdBy);
        this.setLastModifiedBy(lastModifiedBy);
    }

    public SectionMapping(Long pageId, Long sectionId, short modeHide, Integer timeHide, Integer numberHide,
                          String createdBy, String lastModifiedBy) {
        this.pageId = pageId;
        this.sectionId = sectionId;
        this.timeHide = timeHide;
        this.modeHide = modeHide;
        this.numberHide = numberHide;
        this.setCreatedBy(createdBy);
        this.setLastModifiedBy(lastModifiedBy);
    }
}
