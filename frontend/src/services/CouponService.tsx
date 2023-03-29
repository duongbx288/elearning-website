import axios from "axios";

export type CouponRequest = {
    id?: number;
    affiliateId?: number;
    couponCode?: string;
    status?: string;
    useTime?: number;
    createdDate?: Date;
}

class CouponService {

    createNewCoupon = (coupon: CouponRequest) => {
        return axios.post(`/api/coupon/create`, coupon);
    };

    checkExistCoupon = async (coupon: string) => {
        return axios.get(`/api/coupon/check/code=${coupon}`);
    }

    getCouponByAff = (id: number, pageLimit: number, pageNum: number) => {
        return axios.get(`/api/coupon/affId=${id}/pageNum=${pageNum}/pageLimit=${pageLimit}`)
    }
}

export default new CouponService();