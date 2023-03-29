package vn.project.affiliate.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name= "pages")
@Entity
public class PageEntity extends BaseEntity implements Serializable {
    private static final long serialVersionUID = 2L;

    @NotNull
    @Column(name="website_id", nullable = false)
    private int websiteId;

    @NotNull
    @Size(min = 1, max = 100)
    @Column(name="name", nullable = false)
    private String pageName;

    @NotNull
    @Size(min = 1, max = 100)
    @Column(name="url", nullable = false)
    private String pageUrl;



}
