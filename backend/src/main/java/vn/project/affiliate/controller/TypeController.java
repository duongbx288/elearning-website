package vn.project.affiliate.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.project.affiliate.entity.TypeEntity;
import vn.project.affiliate.service.TypeService;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/type")
public class TypeController {

    public final TypeService typeService;

    @GetMapping("/")
    public ResponseEntity<List<TypeEntity>> getAll() {
        try {
            var list = typeService.getAll();
            return ResponseEntity.ok(list);
        } catch (Exception e){
            log.error(e.toString());
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}
