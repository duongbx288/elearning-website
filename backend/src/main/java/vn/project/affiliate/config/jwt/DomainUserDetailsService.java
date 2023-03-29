package vn.project.affiliate.config.jwt;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import vn.project.affiliate.service.UserAccountService;
import vn.project.affiliate.service.UserService;

@Slf4j
@RequiredArgsConstructor
@Component("userDetailsService")
public class DomainUserDetailsService implements UserDetailsService {

    private final UserService userService;
    private final UserAccountService userAccountService;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(final String username) {
        var users1 = userService.getUserInfoByUsername(username);
        var users = userAccountService.getInfoByUsername(username);
        if(CollectionUtils.isNotEmpty(users)) {
            List<String> userInfos =  Arrays.asList(users.get(0).split(","));
            Collection<GrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority(userInfos.get(2)));
            return new User(userInfos.get(0), new BCryptPasswordEncoder().encode(userInfos.get(1)), authorities);
        }
        throw new UserNotActivatedException("User " + username + " was not activated");
    }

}
