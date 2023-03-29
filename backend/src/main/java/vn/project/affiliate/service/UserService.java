package vn.project.affiliate.service;


import vn.project.affiliate.dto.UserAccountDTO;
import vn.project.affiliate.entity.UserEntity;

import java.util.List;

public interface UserService extends BaseService<UserEntity, Long> {
    List<String> getUserInfoByUsername(String username);

    List<String> getUserInfoByEmail(String email);

    UserAccountDTO findUserInfoByUsername(String username);
}

