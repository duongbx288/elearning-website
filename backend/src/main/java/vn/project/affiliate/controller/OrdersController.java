package vn.project.affiliate.controller;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.project.affiliate.dto.OrdersDTO;
import vn.project.affiliate.dto.TeacherDTO;
import vn.project.affiliate.dto.request.OrdersRequest;
import vn.project.affiliate.dto.response.AffiliateResponse;
import vn.project.affiliate.dto.response.TeacherResponse;
import vn.project.affiliate.entity.OrdersEntity;
import vn.project.affiliate.service.OrdersService;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/orders")
public class OrdersController {

    private final OrdersService ordersService;

    @GetMapping("")
    public ResponseEntity<List<OrdersEntity>> getAll(){
        var list = ordersService.getAll();
        return ResponseEntity.ok(list);
    }

    @PostMapping("/create")
    public ResponseEntity<String> createOrder(@RequestBody @Valid OrdersDTO ordersDTO){
        try {
            String result = ordersService.createOrder(ordersDTO);
            if (result.equals("Success")){
                return ResponseEntity.ok("Successful");
            } else {
                return new ResponseEntity<>(result, HttpStatus.OK);
            }
        } catch (Exception e) {
            log.error(e.toString());
            return new ResponseEntity<>("Failed", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value="/pagination/pageNum={num}/pageLimit={limit}", method = {RequestMethod.GET})
    public ResponseEntity<Page<OrdersDTO>> findPages(@PathVariable("num") int num, @PathVariable("limit") int limit){
        try {
            var list = ordersService.getByPagination(num, limit);
            return ResponseEntity.ok(list);
        } catch (Exception e){
            log.error(e.toString());
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

//    @GetMapping(value="/affiliateId={id}")
//    public ResponseEntity<List<OrdersDTO>> findByAffiliateId(@PathVariable("id") int id){
//        try{
//            var list = ordersService.findByAffiliateId(id);
//            return ResponseEntity.ok(list);
//        } catch (Exception e) {
//            log.error(e.toString());
//            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
//        }
//    }

    @GetMapping("/{id}")
    public ResponseEntity<OrdersDTO> findById(@PathVariable long id) {
        var teacherDTO = ordersService.getById((int) id);
        return ResponseEntity.ok(teacherDTO);
    }

//    @GetMapping("/any-month")
//    public ResponseEntity<AffiliateResponse> getOrdersOfAnyMonth(@RequestBody @Valid OrdersRequest request){
//        try{
//            var response = ordersService.getOrdersInfoOfMonth(request.getAffiliateId(), request.getMonth(), request.getYear());
//            return ResponseEntity.ok(response);
//        } catch (Exception e){
//            log.error(e.toString());
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//    @GetMapping("/current-week")
//    public ResponseEntity<AffiliateResponse> getOrdersCurrentWeek(@RequestBody @Valid OrdersRequest request){
//        try{
//            var response = ordersService.getOrdersInfoCurrentWeek(request.getAffiliateId());
//            return ResponseEntity.ok(response);
//        } catch (Exception e){
//            log.error(e.toString());
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

//    @GetMapping("/current-year")
//    public ResponseEntity<AffiliateResponse> getOrdersCurrentYear(@RequestBody @Valid OrdersRequest request){
//        try{
//            var response = ordersService.getOrdersInfoCurrentYear(request.getAffiliateId());
//            return ResponseEntity.ok(response);
//        } catch (Exception e){
//            log.error(e.toString());
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }


    @RequestMapping(value="/update-status", method={RequestMethod.PUT})
    public ResponseEntity<String> updateOrders(@RequestBody @Valid OrdersRequest request){
        String result = "";
        try {
            result = ordersService.updateStatus((int) request.getId(), request.getStatus());
        } catch (Exception e){
            log.error(e.toString());
            return new ResponseEntity<>(e.toString(), HttpStatus.BAD_GATEWAY);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping(value="/delete", method={RequestMethod.PUT})
    public ResponseEntity<String> deleteTeacher(@RequestBody @Valid OrdersRequest request){
        String result = "";
        try {
            result = ordersService.deleteOrders((int) request.getId());
        } catch (Exception e) {
            log.error(e.toString());
            return new ResponseEntity<>(e.toString(), HttpStatus.BAD_GATEWAY);
        }
        return ResponseEntity.ok(result);
    }

    @RequestMapping(value="/update", method={RequestMethod.PUT})
    public ResponseEntity<String> updateTeacher(@RequestBody @Valid OrdersDTO ordersDTO){
        String result = "";
        try {
            result = ordersService.updateOrders(ordersDTO);
        } catch (Exception e){
            log.error(e.toString());
            return new ResponseEntity<>(e.toString(), HttpStatus.BAD_GATEWAY);
        }

        return ResponseEntity.ok(result);
    }
}
