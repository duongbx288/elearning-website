package vn.project.affiliate.service.impl;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.project.affiliate.dto.CouponDTO;
import vn.project.affiliate.entity.CouponEntity;
import vn.project.affiliate.mapper.CouponMapper;
import vn.project.affiliate.repository.CouponRepository;
import vn.project.affiliate.service.CouponService;

import java.time.Instant;

@Slf4j
@Service
public class CouponServiceImpl extends BaseServiceImpl<CouponEntity, Long> implements CouponService {
    private final CouponRepository couponRepository;
    private final CouponMapper couponMapper;

    public CouponServiceImpl(CouponRepository couponRepository, CouponMapper couponMapper) {
        super(couponRepository);
        this.couponMapper = couponMapper;
        this.couponRepository = couponRepository;
    }

    @Override
    public Page<CouponDTO> getByAffId(int pageNum, int pageLimit, int affId){
        Pageable pageable = PageRequest.of(pageNum, pageLimit);
        var list = couponRepository.getByAffiliateId(affId, pageable);
        Page<CouponDTO> coupons = list.map(item -> {
            var dto = couponMapper.toDto(item);
            return dto;
        });

        return coupons;
    }

    @Override
    public String createCoupon(String newCoupon, int affId) {
        var existCouponCode = couponRepository.findExistCouponCode(newCoupon);
        if (!existCouponCode.isEmpty()) {
            return "Failed. Coupon already exists";
        }

        CouponEntity entity = new CouponEntity();
        entity.setCouponCode(newCoupon);
        entity.setStatus("active");
        entity.setAffiliateId(affId);
        entity.setUseTime(0);
        entity.setCreatedDate(Instant.now());
        entity.setLastModifiedDate(Instant.now());
        try {
            save(entity);
        } catch (Exception e){
            log.error(e.toString());
            return "failed";
        }

        return "Success";
    }

    @Override
    public Integer getAffIdByCode(String couponCode) {
        var existCouponCode = couponRepository.findExistCouponCode(couponCode);
        if (existCouponCode.isEmpty()) {
            return 0;
        } else {
            var coupon = existCouponCode.get(0);
            var affId = coupon.getAffiliateId();
            return affId;
        }
    }

    @Override
    public String checkExistCoupon(String couponCode) {
        var existCouponCode = couponRepository.findExistCouponCode(couponCode);
        if (existCouponCode.isEmpty()) {
            return "Failed. Coupon not exists";
        } else {
            var coupon = existCouponCode.get(0);
            var timeUsed = coupon.getUseTime();
            if (timeUsed > 0) {
                return "Coupon already used";
            }
        }
        return "Success";
    }

    @Override
    public boolean updateCoupon(String coupon){
        var couponEntity = couponRepository.findByCouponCode(coupon);
        if (couponEntity.getUseTime() != 0) return false;
        else couponEntity.setUseTime(1);
        save(couponEntity);
        return true;
    }

    @Override
    public String generateCoupon(int affId){
        return "";
    }


}


