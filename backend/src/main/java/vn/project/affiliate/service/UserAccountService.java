package vn.project.affiliate.service;

import org.springframework.transaction.annotation.Transactional;
import vn.project.affiliate.dto.UserAccountDTO;
import vn.project.affiliate.dto.request.UserAccountRequest;
import vn.project.affiliate.entity.TypeEntity;
import vn.project.affiliate.entity.UserAccountEntity;

import java.util.List;

public interface UserAccountService extends BaseService<UserAccountEntity, Long>{

    List<String> getInfoByUsername(String username);

    List<String> getInfoByEmail(String email);

    UserAccountDTO findUserInfo(String info);

    UserAccountDTO findById(int userId);

    UserAccountDTO findByUsername(String username);

    @Transactional
    UserAccountDTO updateUser(UserAccountDTO dto);

    @Transactional
    String addNewUser(UserAccountRequest info);


}
