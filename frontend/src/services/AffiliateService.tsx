import axios from 'axios';

export type AffiliateRequest = {
    id?: number;
    affiliateCode?: string;
    pageNum?: number;
    pageLimit?: number;
    name?: string
    birthDate?: Date;
    avatar?: string;
    address?: string;
    phoneNumber?: string;
    facebook?: string;
    email?: string;
    status?: string;
    username?: string;
}

export type AffiliateResponse = {
    id: number;
    affiliateCode?: string;
    name?: string;
    birthDate?: Date;
    avatar?: string;
    address?: string;
    phoneNumber?: string;
    facebook?: string;
    email?: string;
    status?: string;
}

class AffiliateService {

    getAffiliateById = (id: number) => {
        return axios.get(`api/affiliate/${id}`);
    }

    getAffiliatePag = (request: AffiliateRequest) => {
        return axios.get(`/api/affiliate/pagination/pageNum=${request.pageNum}/pageLimit=${request.pageLimit}`);
    }

    registerAffiliate = (request: AffiliateRequest) => {
        return axios.post(`/api/affiliate/add`, request);
    }

    updateAffiliateStatus = (request: AffiliateRequest) => {
        return axios.put(`/api/affiliate/update-status`, request);
    }

    updateAffiliate = (request: AffiliateRequest) => {
        return axios.put(`/api/affiliate/update`, request);
    }

    countStudent = (id: number) => {
        return axios.get(`/api/affiliate/count-student/${id}`);
    }

}

export default new AffiliateService();