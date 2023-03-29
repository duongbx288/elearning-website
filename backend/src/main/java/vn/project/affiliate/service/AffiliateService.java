package vn.project.affiliate.service;

import org.springframework.data.domain.Page;
import org.springframework.transaction.annotation.Transactional;
import vn.project.affiliate.dto.AffiliateDTO;
import vn.project.affiliate.dto.StudentDTO;
import vn.project.affiliate.entity.AffiliateEntity;

import java.util.List;

public interface AffiliateService extends BaseService<AffiliateEntity,Long> {
    List<AffiliateEntity> getAll();
    AffiliateDTO getById(Integer id);
    List<AffiliateDTO> getAllAffiliate();
    Page<AffiliateDTO> getByPagination(int pageNum, int pageLimit);

    String updateAffiliate(AffiliateDTO dto);

    String updateStatus(int id, String status);

    @Transactional
    AffiliateDTO registerAffiliate(AffiliateDTO affiliateDTO);

    String deleteAffiliate(int id);

    int countStudent(int id);

}
