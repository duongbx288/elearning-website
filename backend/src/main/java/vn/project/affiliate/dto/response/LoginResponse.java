package vn.project.affiliate.dto.response;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse implements Serializable {
    private static final long serialVersionUID = 1L;

    private String token;

}
