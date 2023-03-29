package vn.project.affiliate.mapper;

import org.mapstruct.Mapper;
import vn.project.affiliate.dto.CouponDTO;
import vn.project.affiliate.entity.CouponEntity;

@Mapper(componentModel = "spring")
public interface CouponMapper extends EntityMapper<CouponDTO, CouponEntity> {
}
