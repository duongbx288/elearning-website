package vn.project.affiliate.service;

import org.springframework.transaction.annotation.Transactional;
import vn.project.affiliate.dto.BannerMappingDTO;
import vn.project.affiliate.entity.BannerMapping;

import java.util.List;

public interface BannerMappingService extends BaseService<BannerMapping, Long> {
    BannerMappingDTO byId(long id);
    List<BannerMappingDTO> getAllBannerMapping();
    List<BannerMappingDTO> getListBannerMappingBySection(long sectionId);
    List<BannerMappingDTO> getListBannerPopupByPage(long pageId);

    BannerMappingDTO getBannerMappingByBannerIdAndPageId(long bannerId, long pageId);
    BannerMappingDTO getBannerMappingByBannerIdAndSectionId(long bannerId, long sectionId);
    @Transactional
    void deleteBannerMappingViaSection(long bannerId, long sectionId);

    @Transactional
    void deleteBannerMappingViaPage(long bannerId, long pageId);

    @Transactional
    void deleteByBannerId(long bannerId);


}
