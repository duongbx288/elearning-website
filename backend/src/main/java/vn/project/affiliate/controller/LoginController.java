package vn.project.affiliate.controller;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import vn.project.affiliate.common.Util;
import vn.project.affiliate.config.UserProperties;
import vn.project.affiliate.config.jwt.JWTFilter;
import vn.project.affiliate.config.jwt.TokenProvider;
import vn.project.affiliate.dto.UserAccountDTO;
import vn.project.affiliate.dto.request.LoginRequest;
import vn.project.affiliate.service.UserAccountService;
import vn.project.affiliate.service.UserService;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/login")

public class LoginController {

    private final UserProperties userProperties;
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final UserService userService;
    private final UserAccountService userAccountService;

    @GetMapping("/username={username}")
    public ResponseEntity<UserAccountDTO> getUserInfo(@PathVariable("username") String username){
        try {
            var info = userService.findUserInfoByUsername(username);
            return ResponseEntity.ok(info);
        } catch (Exception e){
            log.error(e.toString());
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/client/username={username}")
    public ResponseEntity<UserAccountDTO> getClientInfo(@PathVariable("username") String username){
        try {
            var info = userAccountService.findUserInfo(username);
            return ResponseEntity.ok(info);
        } catch (Exception e){
            log.error(e.toString());
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("")
    public ResponseEntity authorizeClient(@Valid @RequestBody LoginRequest request) {
        var infos = userAccountService.getInfoByUsername(request.getUsername());
        var users = userAccountService.getInfoByEmail(request.getUsername());
        if(CollectionUtils.isNotEmpty(users) || CollectionUtils.isNotEmpty(infos)) {
            List<String> userInfos = null;
            boolean check;
            if (CollectionUtils.isEmpty(users)) {
                userInfos = new ArrayList<>(Arrays.asList(infos.get(0).split(",")));
//                userInfos.add("ROLE_USER");
            }
            else if (CollectionUtils.isEmpty(infos)) {
                userInfos = new ArrayList<>(Arrays.asList(users.get(0).split(",")));
//                userInfos.add("ROLE_USER");
            }
            if (userInfos.isEmpty()) {
                check = false;
            } else
                check = Util.checkAuthenticate(userInfos, request);
            if (check) {
                var authenticationToken = new UsernamePasswordAuthenticationToken(
                        userInfos.get(0), request.getPassword()
                );
                var authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
                SecurityContextHolder.getContext().setAuthentication(authentication);
                var jwt = tokenProvider.createToken(authentication);
                return ResponseEntity.ok(new JWTToken(JWTFilter.BEARER + jwt));
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PostMapping("/client")
    public ResponseEntity authorize(@Valid @RequestBody LoginRequest request) {
        var infos = userService.getUserInfoByEmail(request.getUsername());
        var users = userService.getUserInfoByUsername(request.getUsername());
        if(CollectionUtils.isNotEmpty(users) || CollectionUtils.isNotEmpty(infos)) {
            List<String> userInfos = null;
            boolean check;
            if (CollectionUtils.isEmpty(users))
                userInfos = Arrays.asList(infos.get(0).split(","));
            else if (CollectionUtils.isEmpty(infos))
                userInfos = Arrays.asList(users.get(0).split(","));
            if (userInfos.isEmpty()) {
                check = false;
            } else
                check = Util.checkAuthenticate(userInfos, request);
            if (check) {
                var authenticationToken = new UsernamePasswordAuthenticationToken(
                        userInfos.get(0), request.getPassword()
                );
                var authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
                SecurityContextHolder.getContext().setAuthentication(authentication);
                var jwt = tokenProvider.createToken(authentication);
                return ResponseEntity.ok(new JWTToken(JWTFilter.BEARER + jwt));
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }



    @Getter
    @Setter
    static class JWTToken {
        private String accessToken;

        public JWTToken(String accessToken) {
            this.accessToken = accessToken;
        }
    }
}
