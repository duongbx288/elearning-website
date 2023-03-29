package vn.project.affiliate.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "sections")
public class Section extends BaseEntity implements Serializable {
    private static final long serialVersionUID = 1L;

    @NotNull
    @Size(min = 2, max = 50)
    @Column(name = "div_id", length = 50, nullable = false)
    private String divId;

    @Column(name = "display_mode")
    private Short mode;

    @Column(name = "description", length = 2000)
    private String desc;

    @NotNull
    @Column(name = "code", nullable = false)
    private String code;

    @NotNull
    @Column(name = "width", nullable = false)
    private Integer width;

    @NotNull
    @Column(name = "height", nullable = false)
    private Integer height;

    public Section(Long id, String divId, String desc, String code, Short mode, Integer width, Integer height, String lastModifiedBy) {
        super(id);
        this.divId = divId;
        this.desc = desc;
        this.mode = mode;
        this.code = code;
        this.width = width;
        this.height = height;
        this.setLastModifiedBy(lastModifiedBy);
    }

    public Section(Long id, String divId, String desc, String code, Short mode, Integer width, Integer height, String createdBy, String lastModifiedBy) {
        super(id);
        this.divId = divId;
        this.desc = desc;
        this.mode = mode;
        this.code = code;
        this.width = width;
        this.height = height;
        this.setCreatedBy(createdBy);
        this.setLastModifiedBy(lastModifiedBy);
    }



    public Section(String divId, String code, String desc, Short mode, Integer width, Integer height, String createdBy) {
        this.divId = divId;
        this.desc = desc;
        this.mode = mode;
        this.code = code;
        this.width = width;
        this.height = height;
        this.setCreatedBy(createdBy);
    }
}