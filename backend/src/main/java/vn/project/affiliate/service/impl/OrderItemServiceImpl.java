package vn.project.affiliate.service.impl;

import org.springframework.data.domain.Page;
import org.springframework.transaction.interceptor.TransactionAspectSupport;
import vn.project.affiliate.dto.OrderItemDTO;
import vn.project.affiliate.dto.request.OrderItemCriteria;
import vn.project.affiliate.entity.OrderItemEntity;
import vn.project.affiliate.mapper.OrderItemMapper;
import vn.project.affiliate.repository.OrderItemRepository;
import vn.project.affiliate.repository.OrdersRepository;
import vn.project.affiliate.service.*;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Slf4j
@Service
public class OrderItemServiceImpl extends BaseServiceImpl<OrderItemEntity, Long> implements OrderItemService {
    private final OrderItemRepository orderItemRepository;
    private final OrderItemMapper orderItemMapper;
    private final CouponService couponService;
    private final OrdersRepository ordersRepository;
    private final UserAccountService userAccountService;
    private final StudentService studentService;
    private final CourseService courseService;

    public OrderItemServiceImpl(OrderItemRepository orderItemRepository,
                                CouponService couponService, OrderItemMapper orderItemMapper,
                                OrdersRepository ordersRepository, UserAccountService userAccountService,
                                StudentService studentService, CourseService courseService){
        super(orderItemRepository);
        this.orderItemRepository = orderItemRepository;
        this.orderItemMapper = orderItemMapper;
        this.couponService = couponService;
        this.ordersRepository = ordersRepository;
        this.userAccountService = userAccountService;
        this.studentService = studentService;
        this.courseService = courseService;
    }

    @Override
    public List<OrderItemDTO> getByOrderId(int id){
        var list = orderItemRepository.findByOrderId(id);
        return orderItemMapper.toDto(list);
    }

    @Override
    public Page<OrderItemDTO> findOrderItems(OrderItemCriteria criteria) {
        Page<OrderItemEntity> list = orderItemRepository.findOrderItems(criteria);
        Page<OrderItemDTO> dtoList = list.map(item -> {
            OrderItemDTO dto = orderItemMapper.toDto(item);
            var order = ordersRepository.getById(dto.getOrderId());
            var userInfo = userAccountService.findById(order.getUserId());
            var courseName = courseService.getById(item.getCourseId());
            var studentInfo = studentService.getById(userInfo.getStudentId());
            dto.setStudentName(studentInfo.getName());
            dto.setCourseName(courseName.getName());
            return dto;
        });
        return dtoList;
    }

    @Override
    public boolean createOrderItem(OrderItemDTO dto){
        try {
            OrderItemEntity newOrderItem = orderItemMapper.toEntity(dto);
            newOrderItem.setCreatedDate(Instant.now());
            newOrderItem.setLastModifiedDate(Instant.now());
            if (newOrderItem.getAffiliateId() != null && newOrderItem.getCouponCode() != null) {
                var affId = couponService.getAffIdByCode(newOrderItem.getCouponCode());
                newOrderItem.setAffiliateId(affId);
            }
            save(newOrderItem);
            if (dto.getCouponCode() != null && dto.getCouponCode().length() > 0){
                couponService.updateCoupon(dto.getCouponCode());
            }
        } catch (Exception e) {
            log.error(e.toString());
            throw e;
        }
        return true;
    }



}
