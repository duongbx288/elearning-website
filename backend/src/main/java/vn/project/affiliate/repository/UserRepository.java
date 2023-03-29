package vn.project.affiliate.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import vn.project.affiliate.entity.UserEntity;

import java.util.List;

@Repository
public interface UserRepository extends BaseRepository<UserEntity, Long> {
    @Query(value = "select u.username, u.password, r.roles from users as u inner join user_roles as ur on u.id = ur.user_id inner join roles as r on ur.role_id = r.id where u.username = ?1", nativeQuery = true)
    List<String> getUserByUserName(String username);

    @Query(value = "select u.username, u.password, r.roles from users as u inner join user_roles as ur on u.id = ur.user_id inner join roles as r on ur.role_id = r.id where u.email = ?1", nativeQuery = true)
    List<String> getUserByEmail(String email);

    @Query(value = "select u.id from users as u where u.username = ?1", nativeQuery = true)
    int getIdByUsername(String username);
}
