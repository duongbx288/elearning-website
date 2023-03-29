package vn.project.affiliate.mapper.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
@AllArgsConstructor
public class BannerException extends RuntimeException {
    private int code;

    private String status;

    private String message;
}
