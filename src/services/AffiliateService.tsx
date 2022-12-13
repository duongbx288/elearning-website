import axios from 'axios';

export type AffiliateRequest = {
    id?: number;
    affiliateCode?: string;
    pageNum?: number;
    pageLimit?: number;
    name?: string
}
class AffiliateService {

    getAffiliateById = (id: number) => {
        return axios.get(`api/affiliate/${id}`);
    }

    getAffiliatePag = (request: AffiliateRequest) => {
        return axios.get(`/api/affiliate/pagination/pageNum=${request.pageNum}/pageLimit=${request.pageLimit}`);
    }

    updateAffiliateStatus = (request: AffiliateRequest) => {
        return axios.put(`/api/affiliate/update-status`, request);
    }

    updateAffiliate = (request: AffiliateRequest) => {
        return axios.put(`/api/affiliate/update`, request);
    }

}

export default new AffiliateService();