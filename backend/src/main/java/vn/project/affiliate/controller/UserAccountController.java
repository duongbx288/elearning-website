package vn.project.affiliate.controller;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.project.affiliate.dto.UserAccountDTO;
import vn.project.affiliate.dto.request.UserAccountRequest;
import vn.project.affiliate.entity.UserAccountEntity;
import vn.project.affiliate.repository.UserAccountRepository;
import vn.project.affiliate.service.UserAccountService;
import vn.project.affiliate.service.impl.BaseServiceImpl;

import javax.validation.Valid;

@Slf4j
@RequiredArgsConstructor
@RestController
//@CrossOrigin(origins = "*")
@RequestMapping("/api/accounts")
public class UserAccountController{

    private final UserAccountService service;

    @PostMapping("/create")
    public ResponseEntity<String> addAccount(@RequestBody @Valid UserAccountRequest dto){
        dto.setStatus("active");
        try {
            String result = service.addNewUser(dto);
            if (result.equals("Success")) {
                return ResponseEntity.ok("Successful");
            } else {
                return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e){
            log.error(e.toString());
            return new ResponseEntity<>("Error", HttpStatus.BAD_REQUEST);
        }
    }

}
