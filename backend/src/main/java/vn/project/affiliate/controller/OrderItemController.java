package vn.project.affiliate.controller;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.project.affiliate.dto.OrderItemDTO;
import vn.project.affiliate.dto.request.OrderItemCriteria;
import vn.project.affiliate.entity.OrderItemEntity;
import vn.project.affiliate.service.OrderItemService;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/order-item")
public class OrderItemController {

    private final OrderItemService orderItemService;

    @GetMapping(value="/search")
    @ResponseBody
    public ResponseEntity searchOrderItems(@Valid OrderItemCriteria criteria) {
        Page<OrderItemDTO> pages = orderItemService.findOrderItems(criteria);
        return ResponseEntity.ok(pages);
    }

    @GetMapping("")
    public ResponseEntity<List<OrderItemEntity>> getAll() {
        var list = orderItemService.getAll();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/orderId={id}")
    public ResponseEntity<List<OrderItemDTO>> getByOrderId(@PathVariable("id") int id) {
        var list = orderItemService.getByOrderId(id);
        return ResponseEntity.ok(list);
    }

}
