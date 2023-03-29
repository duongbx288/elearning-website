package vn.project.affiliate;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.core.env.Environment;
import vn.project.affiliate.config.UserProperties;
import vn.project.affiliate.common.media.EnableMediaProvider;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.TimeZone;

@Slf4j
@SpringBootApplication
@EnableConfigurationProperties({UserProperties.class})
@EnableMediaProvider
public class Application {

    public static void main(String[] args) {
        var app = new SpringApplication(Application.class);
        var env = app.run(args).getEnvironment();
        logApplicationStartup(env);
        TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
    }

    private static void logApplicationStartup(Environment env) {
        var protocol = "http";
        var serverPort = env.getProperty("server.port");
        var contextPath = "/";
        var hostAddress = "localhost";
        try {
            hostAddress = InetAddress.getLocalHost().getHostAddress();
        } catch (UnknownHostException e) {
            log.warn("The host name could not be determined, using `localhost` as fallback");
        }
        log.info(
                "\n----------------------------------------------------------\n\t" +
                        "Application '{}' is running! Access URLs:\n\t" +
                        "Local: \t\t{}://localhost:{}{}\n\t" +
                        "External: \t{}://{}:{}{}\n\t" +
                        "Profile(s): \t{}\n----------------------------------------------------------",
                env.getProperty("spring.application.name"),
                protocol, serverPort, contextPath,
                protocol, hostAddress, serverPort, contextPath,
                env.getActiveProfiles().length == 0 ? env.getDefaultProfiles() : env.getActiveProfiles()
        );
    }

}
