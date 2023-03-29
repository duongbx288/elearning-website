package vn.project.affiliate.repository;

import org.springframework.data.domain.Page;
import vn.project.affiliate.dto.request.OrderItemCriteria;
import vn.project.affiliate.entity.OrderItemEntity;

public interface CustomOrderItemsRepository {

    Page<OrderItemEntity> findOrderItems(OrderItemCriteria criteria);

}
