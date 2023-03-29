package vn.project.affiliate.service.impl;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import vn.project.affiliate.dto.UserAccountDTO;
import vn.project.affiliate.mapper.UserAccountMapper;
import vn.project.affiliate.mapper.UserMapper;
import vn.project.affiliate.repository.UserAccountRepository;
import vn.project.affiliate.repository.UserRepository;
import vn.project.affiliate.service.UserService;
import vn.project.affiliate.entity.UserEntity;

import java.util.List;

@Slf4j
@Service
public class UserServiceImpl extends BaseServiceImpl<UserEntity, Long> implements UserService {

    private final UserRepository userRepository;
    private final UserAccountRepository repository;
    private final UserMapper userMapper;
    private final UserAccountMapper userAccountMapper;

    public UserServiceImpl(
            UserRepository userRepository, UserMapper userMapper, UserAccountRepository repository, UserAccountMapper userAccountMapper
    ) {
        super(userRepository);
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.repository = repository;
        this.userAccountMapper = userAccountMapper;
    }

    @Override
    public List<String> getUserInfoByUsername(String username) {
        return userRepository.getUserByUserName(username);
    }

    @Override
    public List<String> getUserInfoByEmail(String email) {
        return userRepository.getUserByEmail(email);
    }

    @Override
    public UserAccountDTO findUserInfoByUsername(String username) {
        var id = userRepository.getIdByUsername(username);
        var info = repository.getByUserId(id);
        return userAccountMapper.toDto(info);
    }


}
