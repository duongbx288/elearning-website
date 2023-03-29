package vn.project.affiliate.service.impl;
import lombok.extern.slf4j.Slf4j;

import org.aspectj.weaver.ast.Or;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.project.affiliate.dto.OrderItemDTO;
import vn.project.affiliate.dto.OrdersDTO;
import vn.project.affiliate.dto.response.AffiliateResponse;
import vn.project.affiliate.entity.OrdersEntity;
import vn.project.affiliate.entity.StudentCourseEntity;
import vn.project.affiliate.entity.TeacherEntity;
import vn.project.affiliate.mapper.OrdersMapper;
import vn.project.affiliate.repository.OrdersRepository;
import vn.project.affiliate.service.*;

import java.time.Instant;
import java.util.List;

@Slf4j
@Service
public class OrdersServiceImpl extends BaseServiceImpl<OrdersEntity, Long> implements OrdersService {
    private OrdersRepository ordersRepository;
    private OrdersMapper ordersMapper;
    private OrderItemService orderItemService;
    private UserAccountService userAccountService;
    private StudentService studentService;
    private StudentCourseService studentCourseService;

    public OrdersServiceImpl(OrdersRepository ordersRepository, OrdersMapper ordersMapper
    , OrderItemService orderItemService, UserAccountService userAccountService,
            StudentCourseService studentCourseService, StudentService studentService){
        super(ordersRepository);
        this.ordersMapper = ordersMapper;
        this.ordersRepository = ordersRepository;
        this.orderItemService = orderItemService;
        this.userAccountService = userAccountService;
        this.studentService = studentService;
        this.studentCourseService = studentCourseService;
    }

    @Override
    public OrdersDTO getById(int id){
        var order = ordersRepository.getById(id);
        return ordersMapper.toDto(order);
    }

    @Override
    public String createOrder(OrdersDTO orderDTO){
        orderDTO.setCreatedDate(Instant.now());
        orderDTO.setLastModifiedDate(Instant.now());
        var order = ordersMapper.toEntity(orderDTO);
        var orderItemDtos = orderDTO.getOrderItems();
        var userId = orderDTO.getUserId();
        String error = "";
        Long newOrderId;
        // Tạo Order
        try {
            OrdersEntity saved = save(order);
            newOrderId = saved.getId();
        } catch (Exception e) {
            log.error(e.toString());
            error = "Lỗi khi tạo hóa đơn";
            throw e;
        } finally {
            if(error.equals("")) {} else {
                return error;
            }
        }

        // Them OrderItem cho order
        if (newOrderId != null) {
            for (OrderItemDTO item : orderItemDtos) {
                item.setOrderId(Math.toIntExact(newOrderId));
                var result = orderItemService.createOrderItem(item);
                if (!result) return "Failed";
            }
        }

        // Xu li thanh toan o day
        // ----
        // ---- payeezy, stripe etc...
        // Xử lí xong chuyển trạng thái order -> success
        // Không thành công thì rollback!

        // Neu them order Item thanh cong - them khoa hoc cho hoc vien
        var userInfo = userAccountService.findById(userId);

        if (userInfo.getStudentId() != 0) {
            for (OrderItemDTO item : orderItemDtos) {
              var result = studentCourseService.createStudentCourse(userInfo.getStudentId(), item.getCourseId());
                if (!result) {return "Failed";}
            }
        }

        return "Success";
    }

//    @Override
//    public List<OrdersDTO> findByAffiliateId(int id){
//        var list = ordersRepository.findByAffiliateId(id);
//        return ordersMapper.toDto(list);
//    }

    @Override
    public List<OrdersDTO> findByUserId(int id){
        var list = ordersRepository.findByUserId(id);
        return ordersMapper.toDto(list);
    }

    @Override
    public Page<OrdersDTO> getByPagination(int pageNum, int pageLimit){
        Pageable pageable = PageRequest.of(pageNum, pageLimit);
        var list = findAll(pageable);
        Page<OrdersDTO> ordersDTOS = list.map(order -> {
            return ordersMapper.toDto(order);
        });

        return ordersDTOS;
    }

    @Override
    public String updateOrders(OrdersDTO ordersDTO){
        try {
            OrdersEntity orders = ordersMapper.toEntity(ordersDTO);
            save(orders);
        } catch (Exception e) {
            log.error(e.toString());
            return e.toString();
        }

        return "Success";
    }

    @Override
    public String updateStatus(int id, String status){
        try {
            ordersRepository.updateStatus(status, id);
        } catch (Exception e){
            log.error(e.toString());
            return e.toString();
        }
        return "Success";
    }

    @Override
    public String deleteOrders(int id){
        try {
            ordersRepository.deleteOrders(id);
        } catch (Exception e){
            log.error(e.toString());
            return e.toString();
        }
        return "Success";
    }

//    @Override
//    public AffiliateResponse getOrdersInfoOfMonth(int affiliateId, int month, int year){
//        AffiliateResponse response = new AffiliateResponse();
//        try {
//            var list = ordersRepository.getOrderOfParticularMonth(affiliateId, month, year);
//            response.setOrders(ordersMapper.toDto(list));
//            response.setCountTotal(ordersRepository.countOrderOfParticularMonth(affiliateId, month, year));
//            return response;
//        } catch (Exception e){
//            log.error(e.toString());
//            return response;
//        }
//    }
//
//    @Override
//    public AffiliateResponse getOrdersInfoCurrentWeek(int affiliateId){
//        AffiliateResponse response = new AffiliateResponse();
//        try{
//            var list = ordersRepository.getOrderCurrentWeek(affiliateId);
//            response.setOrders(ordersMapper.toDto(list));
//            response.setCountTotal(ordersRepository.countOrderCurrentWeek(affiliateId));
//            return response;
//        } catch (Exception e){
//            log.error(e.toString());
//            return response;
//        }
//    }
//
//    @Override
//    public AffiliateResponse getOrdersInfoCurrentYear(int affiliateId){
//        AffiliateResponse response = new AffiliateResponse();
//        try{
//            var list = ordersRepository.getOrderCurrentYear(affiliateId);
//            response.setOrders(ordersMapper.toDto(list));
//            response.setCountTotal(ordersRepository.countOrderCurrentYear(affiliateId));
//            return response;
//        } catch (Exception e){
//            log.error(e.toString());
//            return response;
//        }
//    }
}
