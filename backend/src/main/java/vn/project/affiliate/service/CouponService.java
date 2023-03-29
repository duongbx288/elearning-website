package vn.project.affiliate.service;

import org.springframework.data.domain.Page;
import org.springframework.transaction.annotation.Transactional;
import vn.project.affiliate.dto.CouponDTO;
import vn.project.affiliate.entity.CouponEntity;

public interface CouponService extends BaseService<CouponEntity, Long> {

    @Transactional(rollbackFor = {Exception.class})
    String createCoupon(String coupon, int affId);

    String checkExistCoupon(String coupon);

    Integer getAffIdByCode(String couponCode);

    String generateCoupon(int affId);

    Page<CouponDTO> getByAffId(int pageNum, int pageLimit, int affId);

//    Page<CouponDTO> getByAffiliateId(int affId);

    // Cap nhap so lan dung cua Coupon - va chuyen trang thai cua coupon
    // sang Used/Complete.....
    @Transactional
    boolean updateCoupon(String coupon);
}
