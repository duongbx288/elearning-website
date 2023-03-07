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

    checkExistCoupon = async (coupon: string) => {
        return axios.get(`/api/coupon/check/code=${coupon}`);
    }
}

export default new CouponService();