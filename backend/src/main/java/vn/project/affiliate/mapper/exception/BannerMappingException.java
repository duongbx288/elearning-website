package vn.project.affiliate.mapper.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
@AllArgsConstructor
public class BannerMappingException extends RuntimeException {
    private HttpStatus status;
    private String message;
}
