package vn.project.affiliate.repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import vn.project.affiliate.entity.OrdersEntity;

import java.util.List;

public interface OrdersRepository extends BaseRepository<OrdersEntity, Long> {

    @Query(value="select * from orders where id = ?1", nativeQuery = true)
    OrdersEntity getById(Integer id);

//    List<OrdersEntity> findByAffiliateId(int id);
    List<OrdersEntity> findByUserId(int id);

    @Modifying
    @Transactional
    @Query(value="update orders t set t.status = ?1 where t.id = ?2", nativeQuery = true)
    void updateStatus(String status, int id);

    @Modifying
    @Transactional
    @Query(value="update orders s set s.status = 'deleted' where s.id = ?1", nativeQuery = true)
    void deleteOrders(int id);

    // order thu duoc cua thang bat ky
    @Query(value="select o.* from orders o, user_account uc, student s \n" +
            "where o.user_id = uc.user_id and uc.student_id = s.id and o.affiliate_id = ?1 and o.status = 'complete'\n" +
            "and month(o.created_at) = ?2 and year(o.created_at) = ?3", nativeQuery = true)
    List<OrdersEntity> getOrderOfParticularMonth(int affiliateId, int month, int year);

    // tong tien thu duoc cua thang bat ky
    @Query(value="select sum(ord.total) from \n" +
            "(select o.* from orders o, user_account uc, student s \n" +
            "where o.user_id = uc.user_id and uc.student_id = s.id and o.affiliate_id = ?1 and o.status = 'complete'\n" +
            "and month(o.created_at) = ?2 and year(o.created_at) = ?3) as ord", nativeQuery = true)
    long countOrderOfParticularMonth(int affiliateId, int month, int year);

    //  thu duoc trong tuan
    @Query(value="select o.* from orders o, user_account uc, student s \n" +
            "where o.user_id = uc.user_id and uc.student_id = s.id and o.affiliate_id = ?1 and o.status = 'complete'\n" +
            "and yearweek(o.created_at, 1) = yearweek(curdate(),1)", nativeQuery = true)
    List<OrdersEntity> getOrderCurrentWeek(int affiliateId);

    // Tong tien thu duoc trong tuan
    @Query(value="select sum(ord.total) from\n" +
            "(select o.* from orders o, user_account uc, student s\n" +
            "where o.user_id = uc.user_id and uc.student_id = s.id and o.affiliate_id = ?1 and o.status = 'complete'\n" +
            "and yearweek(o.created_at, 1) = yearweek(curdate(),1)) as ord", nativeQuery = true)
    long countOrderCurrentWeek(int affiliateId);

    // Thu duoc trong nam
    @Query(value="select o.* from orders o, user_account uc, student s \n" +
            "where o.user_id = uc.user_id and uc.student_id = s.id and o.affiliate_id = ?1 and o.status = 'complete'\n" +
            "and year(o.created_at) = year(current_date())", nativeQuery = true)
    List<OrdersEntity> getOrderCurrentYear(int affiliateId);

    // Tong tien thu duoc trong naam
    @Query(value="select sum(ord.total) from\n" +
            "(select o.* from orders o, user_account uc, student s \n" +
            "where o.user_id = uc.user_id and uc.student_id = s.id and o.affiliate_id = ?1 and o.status = 'complete'\n" +
            "and year(o.created_at) = year(current_date())) as ord", nativeQuery = true)
    long countOrderCurrentYear(int affiliateId);
}
