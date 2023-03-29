package vn.project.affiliate.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import vn.project.affiliate.entity.CouponEntity;

import java.util.List;

public interface CouponRepository extends BaseRepository<CouponEntity,Long> {

    @Query(value="select * from coupon where coupon_code = ?1", nativeQuery = true)
    List<CouponEntity> findExistCouponCode(String code);

    Page<CouponEntity> getByAffiliateId(int affiliateId, Pageable pageable);

    CouponEntity findByCouponCode(String couponCode);


}
