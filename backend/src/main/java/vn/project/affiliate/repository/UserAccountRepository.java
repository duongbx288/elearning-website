package vn.project.affiliate.repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import vn.project.affiliate.entity.UserAccountEntity;

import java.util.List;

@Repository
public interface UserAccountRepository extends BaseRepository<UserAccountEntity, Long>{
    @Query(value="select * from user_account where id = ?1", nativeQuery = true)
    UserAccountEntity getByUserId(int userId);

    @Query(value="select r.roles from user_account as uc inner join user_roles as ur on uc.id = ur.user_id inner join roles as r on ur.role_id = r.id where uc.username = ?1 or uc.email = ?1", nativeQuery = true)
    List<String> getRoles(String username);

    @Query(value="select * from user_account where username = ?1 or email = ?1", nativeQuery = true)
    UserAccountEntity getByUsername(String username);

    @Query(value="select uc.username, uc.password, r.roles from user_account as uc inner join user_roles as ur on uc.id = ur.user_id inner join roles as r on ur.role_id = r.id where uc.username = ?1", nativeQuery = true)
    List<String> getUserByUsername(String username);

    @Query(value="select uc.username, uc.password, r.roles from user_account as uc inner join user_roles as ur on uc.id = ur.user_id inner join roles as r on ur.role_id = r.id where uc.email = ?1", nativeQuery = true)
    List<String> getUserByEmail(String email);

    @Modifying
    @Transactional
    @Query(value="insert into user_roles (user_id, role_id) value (?1, ?2)", nativeQuery = true)
    void saveNewRoles(long userId, int roleId);
}
