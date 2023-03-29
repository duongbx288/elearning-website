package vn.project.affiliate.mapper;
import org.mapstruct.Mapper;
import vn.project.affiliate.dto.OrdersDTO;
import vn.project.affiliate.entity.OrdersEntity;

@Mapper(componentModel = "spring")
public interface OrdersMapper extends EntityMapper<OrdersDTO, OrdersEntity> {
}
