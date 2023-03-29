package vn.project.affiliate.repository;

import org.springframework.data.jpa.repository.Query;
import vn.project.affiliate.entity.OrderItemEntity;

import java.util.List;

public interface OrderItemRepository extends BaseRepository<OrderItemEntity, Long>, CustomOrderItemsRepository {

    @Query(value="select * from order_item where id = ?1", nativeQuery = true)
    OrderItemEntity getById(Integer id);

    List<OrderItemEntity> findByOrderId(int id);
}
