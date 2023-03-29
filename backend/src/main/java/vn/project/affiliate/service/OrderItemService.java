package vn.project.affiliate.service;

import org.springframework.data.domain.Page;
import org.springframework.transaction.annotation.Transactional;
import vn.project.affiliate.dto.OrderItemDTO;
import vn.project.affiliate.dto.request.OrderItemCriteria;
import vn.project.affiliate.entity.OrderItemEntity;

import java.util.List;

public interface OrderItemService extends BaseService<OrderItemEntity, Long> {

    List<OrderItemEntity> getAll();

    List<OrderItemDTO> getByOrderId(int id);

    @Transactional
    boolean createOrderItem(OrderItemDTO dto);

    Page<OrderItemDTO> findOrderItems(OrderItemCriteria criteria);
}
