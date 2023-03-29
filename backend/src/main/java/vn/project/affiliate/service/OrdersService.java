package vn.project.affiliate.service;

import org.springframework.data.domain.Page;
import org.springframework.transaction.annotation.Transactional;
import vn.project.affiliate.dto.OrderItemDTO;
import vn.project.affiliate.dto.OrdersDTO;
import vn.project.affiliate.dto.response.AffiliateResponse;
import vn.project.affiliate.entity.OrdersEntity;

import java.util.List;

public interface OrdersService extends BaseService<OrdersEntity, Long> {

    List<OrdersEntity> getAll();

    @Transactional(rollbackFor = {Exception.class})
    String createOrder(OrdersDTO order);

    OrdersDTO getById(int id);
//    List<OrdersDTO> findByAffiliateId(int id);
    List<OrdersDTO> findByUserId(int id);

    Page<OrdersDTO> getByPagination(int pageNum, int pageLimit);

    String updateOrders(OrdersDTO ordersDTO);

    String updateStatus(int id, String status);

    String deleteOrders(int id);

//    AffiliateResponse getOrdersInfoOfMonth(int affiliateId, int month, int year);
//
//    AffiliateResponse getOrdersInfoCurrentWeek(int affiliateId);
//
//    AffiliateResponse getOrdersInfoCurrentYear(int affiliateId);
}
