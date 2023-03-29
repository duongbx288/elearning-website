package vn.project.affiliate.controller;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.protocol.HTTP;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.project.affiliate.dto.CouponDTO;
import vn.project.affiliate.service.CouponService;

import javax.validation.Valid;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/coupon")
public class CouponController {

    private final CouponService couponService;

    @GetMapping("/affId={id}/pageNum={num}/pageLimit={limit}")
    public ResponseEntity getCouponsByAffId(@PathVariable("id") int id, @PathVariable("num") int pageNum, @PathVariable("limit") int pageLimit) {
        var list = couponService.getByAffId(pageNum, pageLimit, id);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/check/code={code}")
    public ResponseEntity checkExistCoupon(@PathVariable("code") String code){
        var exist = couponService.checkExistCoupon(code);
        switch (exist) {
            case "Success":
                return ResponseEntity.ok("Success");
            case "Failed. Coupon not exists":
                return ResponseEntity.ok("Coupon not exists");
            case "Coupon already used":
                return ResponseEntity.ok("Coupon already used");
            default:
                return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<String> createCoupon(@RequestBody @Valid CouponDTO dto){
        try {
            String result = couponService.createCoupon(dto.getCouponCode(), dto.getAffiliateId());
            if (result.equals("Success")){
                return ResponseEntity.ok("Successful");
            } else {
                return new ResponseEntity<>("Coupon exists", HttpStatus.OK);
            }
        } catch (Exception e){
            log.error(e.toString());
            return new ResponseEntity<>("Failed", HttpStatus.BAD_REQUEST);
        }
    }

}
