package vn.project.affiliate.dto.request;

import java.io.Serializable;
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
public class LoginRequest implements Serializable {
    private static final long serialVersionUID = 1L;

    @NotNull
    @Size(min = 2, max = 50)
    private String username;

    @NotNull
    @Size(min = 4, max = 50)
    private String password;

    @Size(max = 50)
    private String email;

}
