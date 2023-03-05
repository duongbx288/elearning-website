import axios from "axios";

export type CouponRequest = {
    id?: number;
    affiliateId?: number;
    couponCode?: string;
    status?: string;
    useTime?: number;
}

class CouponService {

    createNewCoupon = (coupon: CouponRequest) => {
        return axios.post(`/api/coupon/create`, coupon);
    };
}

export default new CouponService();