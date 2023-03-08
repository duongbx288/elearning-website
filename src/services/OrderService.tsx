import axios from 'axios';

export type OrderRequest = {
    id?: number;
    pageNum?: number;
    pageLimit?: number;
    userId?: number;
    studentId?: number;
    // courseId?: number;
    affiliateId?: number;
    initialSsum?: number; // Tong tien chua khuyen mai
    discount?: number; // So tien khuyen mai
    total?: number; // Tong tien sau khi tinh khuyen mai
    status?: string;
    createdAt?: Date;
    lastModifiedAt?: Date;
    createdBy?: string;
    lastModifiedBy?: string;
    orderItems?: OrderItemRequest[];
}

export type OrderItemRequest = {
    id?: number;
    orderId?: number;
    courseId?: number;
    initPrice?: number;
    discount?: number;
    total?: number;
    couponCode?: string | null;    
    affiliateId?: number;
    // from course
    price?: string;
    name?: string;
    teacherId?: string;
    cover?: string;
}


class OrderService {
    getAllPag = (request: OrderRequest) => {
        return axios.get(`/api/orders/pagination/pageNum=${request.pageNum}/pageLimit=${request.pageLimit}`)
    }

    createNewOrder = (request: OrderRequest) => {
        return axios.post(`/api/orders/create`, request);
    }

    updateOrdersStatus = (request: OrderRequest) => {
        return axios.put(`/api/orders/update-status`, request);
    }

    updateOrders = (request: OrderRequest) => {
        return axios.put(`/api/orders/update`, request);
    }

    // getByAffiliateId = (request: OrderRequest) => {
    //     return axios.get(`/api/orders/affiliateId=${request.affiliateId}`);
    // }

    getById = (id: number) => {
        return axios.get(`/api/orders/${id}`);
    }

    getByAffiliateId = (id: number) => {
        return axios.get(`/api/orders/affiliateId=${id}`);
    }
    
    getOrderItemByOrderId = (id: number) => {
        return axios.get(`/api/order-item/orderId=${id}`);
    }

}

export default new OrderService();