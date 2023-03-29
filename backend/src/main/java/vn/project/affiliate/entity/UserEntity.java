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
@Table(name = "users")
public class UserEntity extends BaseEntity implements Serializable {
    private static final long serialVersionUID = 1L;

    @NotNull
    @Size(min = 2, max = 50)
    @Column(name = "username", length = 50, nullable = false)
    private String username;

    @NotNull
    @Size(min = 6, max = 50)
    @Column(name = "password", length = 50, nullable = false)
    private String password;

    @Column(name = "email")
    private String email;

}
