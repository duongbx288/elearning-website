package vn.project.affiliate.entity;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "banners")
public class Banner extends BaseEntity implements Serializable {
    private static final long serialVersionUID = 1L;
    @NotNull
    @Size(min = 1, max = 50)
    @Column(length = 50, nullable = false, name = "code")
    private String code;

    @NotNull
    @Size(min = 1, max = 50)
    @Column(length = 50, nullable = false, name = "title")
    private String title;


    @Size(min = 0, max = 2000)
    @Column(length = 2000, nullable = false, name = "url")
    private String url;

    @NotNull
    @Size(min = 1, max = 2000)
    @Column(length = 2000, nullable = false, name = "img_url")
    private String imgUrl;

    @NotNull
    @Size(min = 1, max = 255)
    @Column(length = 255, nullable = false, name = "type")
    private String type;

    @NotNull
    @Column(name = "pop_up", columnDefinition = "0")
    private Short popUp;

    @NotNull
    @Column(name = "modal", columnDefinition = "0")
    private Short modal;

    @NotNull
    @Column(name = "width", nullable = false)
    private Integer width;

    @NotNull
    @Column(name ="height", nullable = false)
    private Integer height;

    @NotNull
    @Column(name ="banner_width", columnDefinition = "native")
    private String bannerWidth;

    public Banner(Long id, String code, String title, String imgUrl, String url, String type, Short popUp, Short modal,
                  Integer width, Integer height, String bannerWidth, String createdBy, String lastModifiedBy) {
        super(id);
        this.code = code;
        this.title = title;
        this.imgUrl = imgUrl;
        this.url = url;
        this.type = type;
        this.popUp = popUp;
        this.modal = modal;
        this.width = width;
        this.height = height;
        this.bannerWidth = bannerWidth;
//        this.setCreatedBy(createdBy);
//        this.setLastModifiedBy(lastModifiedBy);
    }

    public Banner(String code, String title, String imgUrl, String url, String type,Short popUp, Short modal,
                  Integer width, Integer height, String bannerWidth, String createdBy, String lastModifiedBy) {
        this.code = code;
        this.title = title;
        this.imgUrl = imgUrl;
        this.url = url;
        this.type = type;
        this.popUp = popUp;
        this.modal = modal;
        this.width = width;
        this.height = height;
        this.bannerWidth = bannerWidth;
//        this.setCreatedBy(createdBy);
//        this.setLastModifiedBy(lastModifiedBy);
    }


}
