package vn.project.affiliate.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.Entity;
import javax.persistence.Column;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="orders")
public class OrdersEntity extends BaseEntity{

    @Column(name="user_id")
    private Integer userId;

    @Column(name="initial_sum")
    private Integer initialSum;

    @Column(name="discount")
    private Integer discount;

    @Column(name="total")
    private Integer total;

    @Column(name="status")
    private String status;
}
