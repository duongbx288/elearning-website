import axios from "axios";

type CouponRequest = {
    id?: number;
    affiliateId?: number;
    couponCode?: string;
    status?: string;
    useTime?: number;
}

class CouponService {

    createNewCoupon = (coupon: CouponRequest) => {
        return axios.post(`/api/coupon/create`, coupon).catch(function (error) {
            if (error.response) {
            } else if (error.request) {
            } else {
              console.log('Error', error.message);
            }
        });
    };
}

export default new CouponService();