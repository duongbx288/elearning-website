package vn.project.affiliate.mapper;
import org.mapstruct.Mapper;
import vn.project.affiliate.dto.OrderItemDTO;
import vn.project.affiliate.entity.OrderItemEntity;

@Mapper(componentModel = "spring")
public interface OrderItemMapper extends EntityMapper<OrderItemDTO, OrderItemEntity> {
}
