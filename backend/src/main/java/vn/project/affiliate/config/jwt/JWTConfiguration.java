package vn.project.affiliate.config.jwt;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@RequiredArgsConstructor
@Configuration
public class JWTConfiguration extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity>{

    private final TokenProvider tokenProvider;

    @Override
    public void configure(HttpSecurity http) {
        var jwtFilter = new JWTFilter(tokenProvider);
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
    }

}
