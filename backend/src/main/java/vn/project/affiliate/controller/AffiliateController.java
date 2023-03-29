package vn.project.affiliate.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.relational.core.sql.In;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.project.affiliate.dto.AffiliateDTO;
import vn.project.affiliate.dto.StudentDTO;
import vn.project.affiliate.dto.request.StudentRequest;
import vn.project.affiliate.service.AffiliateService;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/affiliate")
public class AffiliateController {

    private final AffiliateService affiliateService;

    @GetMapping("")
    public ResponseEntity<List<AffiliateDTO>> getAllAffiliate() {
        var list = affiliateService.getAllAffiliate();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AffiliateDTO> findById(@PathVariable long id) {
        var dto = affiliateService.getById((int) id);
        return ResponseEntity.ok(dto);
    }

    @PostMapping("/add")
    public ResponseEntity createAffiliate(@RequestBody @Valid AffiliateDTO dto) {
        try {
            var newAff = affiliateService.registerAffiliate(dto);
            return ResponseEntity.ok(newAff);
        } catch (Exception e) {
            log.error(e.toString());
            return new ResponseEntity(null, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/count-student/{id}")
    public ResponseEntity<Integer> countStudent(@PathVariable("id") int id){
        try {
            var count = affiliateService.countStudent(id);
            return ResponseEntity.ok(count);
        } catch (Exception e){
            log.error(e.toString());
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value="/pagination/pageNum={num}/pageLimit={limit}", method = {RequestMethod.GET})
    public ResponseEntity<Page<AffiliateDTO>> getAffiliatePagination(@PathVariable("num")int num, @PathVariable("limit") int limit){
        try {
            var list = affiliateService.getByPagination(num, limit);
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            log.error(e.toString());
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value="/update-status", method={RequestMethod.PUT})
    public ResponseEntity<String> updateStudentInfo(@RequestBody @Valid StudentRequest request){
        String result = "";
        try {
            result = affiliateService.updateStatus(request.getId(), request.getStatus());
        } catch (Exception e){
            log.error(e.toString());
            return new ResponseEntity<>(e.toString(), HttpStatus.BAD_GATEWAY);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }


    @RequestMapping(value="/delete", method={RequestMethod.PUT})
    public ResponseEntity<String> deleteStudent(@RequestBody @Valid StudentRequest request){
        String result = "";
        try {
            result = affiliateService.deleteAffiliate(request.getId());
        } catch (Exception e) {
            log.error(e.toString());
            return new ResponseEntity<>(e.toString(), HttpStatus.BAD_GATEWAY);
        }
        return ResponseEntity.ok(result);
    }


    @RequestMapping(value="/update", method={RequestMethod.PUT})
    public ResponseEntity<String> updateStudent(@RequestBody @Valid AffiliateDTO dto){
        String result = "";
        try {
            result = affiliateService.updateAffiliate(dto);
        } catch (Exception e){
            log.error(e.toString());
            return new ResponseEntity<>(e.toString(), HttpStatus.BAD_GATEWAY);
        }

        return ResponseEntity.ok(result);
    }

}
