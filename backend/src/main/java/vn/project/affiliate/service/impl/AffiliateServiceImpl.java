package vn.project.affiliate.service.impl;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.project.affiliate.dto.AffiliateDTO;
import vn.project.affiliate.dto.StudentDTO;
import vn.project.affiliate.entity.AffiliateEntity;
import vn.project.affiliate.entity.StudentEntity;
import vn.project.affiliate.mapper.AffiliateMapper;
import vn.project.affiliate.repository.AffiliateRepository;
import vn.project.affiliate.repository.UserAccountRepository;
import vn.project.affiliate.service.AffiliateService;
import vn.project.affiliate.service.UserAccountService;

import java.util.List;

@Slf4j
@Service
public class AffiliateServiceImpl extends BaseServiceImpl<AffiliateEntity, Long> implements AffiliateService {
    private final AffiliateRepository affiliateRepository;
    private final AffiliateMapper affiliateMapper;
    private final UserAccountService userAccountService;

    public AffiliateServiceImpl(AffiliateRepository affiliateRepository, AffiliateMapper affiliateMapper,
                                UserAccountService userAccountService){
        super(affiliateRepository);
        this.affiliateMapper = affiliateMapper;
        this.affiliateRepository = affiliateRepository;
        this.userAccountService = userAccountService;
    }

    @Override
    public AffiliateDTO registerAffiliate(AffiliateDTO dto) {
        dto.setStatus("active");
        var username = dto.getUsername();
        if (username.isEmpty() && username.isBlank()) {
            return null;
        }
        var userInfo = userAccountService.findByUsername(username);
        if (userInfo != null) {} else return null;
        var newEntity = affiliateMapper.toEntity(dto);
        var newAff = save(newEntity);
        var newAffId = newAff.getId();
        userInfo.setAffiliateId(Math.toIntExact(newAffId));
        userAccountService.updateUser(userInfo);

        return affiliateMapper.toDto(newAff);
    }

    @Override
    public AffiliateDTO getById(Integer id) {
        var affiliate = affiliateRepository.getById(id);
        return affiliateMapper.toDto(affiliate);
    }

    @Override
    public List<AffiliateDTO> getAllAffiliate() {
        var affiliates = getAll();
        return affiliateMapper.toDto(affiliates);
    }

    @Override
    public Page<AffiliateDTO> getByPagination(int pageNum, int pageLimit){
        Pageable pageable = PageRequest.of(pageNum, pageLimit);
        var affiliates = findAll(pageable);
        Page<AffiliateDTO> affiliateDTOS = affiliates.map(affiliate -> {
            return affiliateMapper.toDto(affiliate);
        });
        return affiliateDTOS;
    }

    @Override
    public int countStudent(int id){
        var count = affiliateRepository.countStudent(id);
        return count;
    }


    public boolean validateAvailableId(int id) {
        var existStudent = findById((long) id);
        if (existStudent.isEmpty()) {
            return false;
        }
        return true;
    }

    @Override
    public String updateStatus(int id, String status) {
        boolean validate1 = validateAvailableId(id);
        if (validate1 == false) return "Affiliate not exists";
        try {
            affiliateRepository.updateStatus(status, id);
        } catch (Exception e){
            log.error(e.toString());
            return e.toString();
        }
        return "Success";
    }


    @Override
    public String deleteAffiliate(int id) {
        boolean validate1 = validateAvailableId(id);
        if (validate1 == false) return "Affiliate not exists";

        try {
            affiliateRepository.deleteAffiliate(id);
        } catch (Exception e){
            log.error(e.toString());
            return e.toString();
        }

        return "Success";
    }

    @Override
    public String updateAffiliate(AffiliateDTO dto) {
        var existStudent = findById(dto.getId());
        if(existStudent.isEmpty()){
            return "Error";
        }
        try {
            AffiliateEntity ent = affiliateMapper.toEntity(dto);
            save(ent);
        } catch(Exception e){
            log.error(e.toString());
            return "Error";
        }

        return "Success";
    }
}
