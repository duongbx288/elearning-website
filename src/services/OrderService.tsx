import axios from 'axios';

export type OrderRequest = {
    id?: number;
    pageNum?: number;
    pageLimit?: number;
    userId?: number;
    courseId?: number;
    affiliateId?: number;
    initialSum?: number; // Tong tien chua khuyen mai
    discount?: number; // So tien khuyen mai
    total?: number; // Tong tien sau khi tinh khuyen mai
    status?: string;
    createdDate?: Date;
    lastModifiedDate?: Date;
    createdBy?: string;
    lastModifiedBy?: string;
}

class OrderService {
    getAllPag = (request: OrderRequest) => {
        return axios.get(`/api/orders/pagination/pageNum=${request.pageNum}/pageLimit=${request.pageLimit}`)
    }

    updateOrdersStatus = (request: OrderRequest) => {
        return axios.put(`/api/orders/update-status`, request);
    }

    updateOrders = (request: OrderRequest) => {
        return axios.put(`/api/orders/update`, request);
    }

    getByAffiliateId = (request: OrderRequest) => {
        return axios.get(`/api/orders/affiliateId=${request.affiliateId}`);
    }

    getById = (id: number) => {
        return axios.get(`/api/orders/${id}`);
    }

    

}

export default new OrderService();