package vn.project.affiliate.config;

import java.util.Collections;
import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class WebConfiguration {

    @Bean
    public CorsFilter corsFilter() {
        var allowed = Collections.singletonList("*");
        var source = new UrlBasedCorsConfigurationSource();
        var config = new CorsConfiguration();
        config.setAllowedOriginPatterns(allowed);
        config.setAllowedMethods(allowed);
        config.setAllowedHeaders(allowed);
        config.setAllowCredentials(true);
        config.setExposedHeaders(List.of("Authorization"));
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }

}
