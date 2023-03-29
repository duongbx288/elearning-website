package vn.project.affiliate.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="type")
public class TypeEntity extends BaseEntity{

    @Column(name="name")
    private String name;

    @Column(name="cate_img")
    private String cateImg;
}
