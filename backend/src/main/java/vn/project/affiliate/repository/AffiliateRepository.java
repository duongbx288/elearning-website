package vn.project.affiliate.repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import vn.project.affiliate.entity.AffiliateEntity;
import vn.project.affiliate.entity.StudentEntity;

import java.util.List;

public interface AffiliateRepository extends BaseRepository<AffiliateEntity, Long> {

    @Query(value="select * from affiliate where id = ?1", nativeQuery = true)
    AffiliateEntity getById(Integer id);

    AffiliateEntity getByName(String name);

    @Query(value="select * from affiliate where affiliate_code = ?1 and id not like ?2", nativeQuery = true)
    List<AffiliateEntity> findByCodeNotSameId(String code, long id);

    @Modifying
    @Transactional
    @Query(value="update affiliate s set s.status = ?1 where s.id = ?2", nativeQuery= true)
    void updateStatus(String status, int id);

    @Modifying
    @Transactional
    @Query(value="update affiliate s set s.status = 'deleted' where s.id = ?1", nativeQuery = true)
    void deleteAffiliate(int id);

    @Query(value="select count(*) from \n" +
            "(select s.* from orders o, user_account uc, student s \n" +
            "where o.user_id = uc.user_id and uc.student_id = s.id and o.affiliate_id = ?1\n" +
            "group by s.id) as s ", nativeQuery = true)
    int countStudent(int affiliateId);


}
