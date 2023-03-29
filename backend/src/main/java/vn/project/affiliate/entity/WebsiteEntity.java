package vn.project.affiliate.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="websites")
public class WebsiteEntity extends BaseEntity implements Serializable {
    private static final long serialVersionID = 1L;

    @NotNull
    @Size(min = 2, max = 100)
    @Column(name="code", nullable = false)
    private String code;

    @NotNull
    @Size(min = 2, max = 100)
    @Column(name="domain",nullable = false)
    private String domain;


    @Column(name="web_key",nullable = false)
    private String webKey;

    @Override
    public String toString() {
        return "WebsiteEntity{" +
                "code='" + code + '\'' +
                ", domain='" + domain + '\'' +
                ", webKey='" + webKey + '\'' +
                '}';
    }


}
