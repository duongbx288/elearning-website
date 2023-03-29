package vn.project.affiliate.config.jwt;

import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

@Component
public class SecurityProblemSupport implements AuthenticationEntryPoint, AuthenticationFailureHandler, AccessDeniedHandler {

    @Override
    public void commence(
        final HttpServletRequest request, final HttpServletResponse response, final AuthenticationException exception
    ) throws IOException {
        response.sendError(HttpStatus.UNAUTHORIZED.value(), exception.getMessage());
    }

    @Override
    public void onAuthenticationFailure(
        final HttpServletRequest request, final HttpServletResponse response, final AuthenticationException exception
    ) throws IOException {
        response.sendError(HttpStatus.UNAUTHORIZED.value(), exception.getMessage());
    }

    @Override
    public void handle(
        final HttpServletRequest request, final HttpServletResponse response, final AccessDeniedException exception
    ) throws IOException {
        response.sendError(HttpStatus.FORBIDDEN.value(), exception.getMessage());
    }

}
