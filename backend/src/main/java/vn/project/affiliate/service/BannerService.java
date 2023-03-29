package vn.project.affiliate.service;

import vn.project.affiliate.dto.BannerDTO;
import vn.project.affiliate.entity.Banner;

import java.util.List;

public interface BannerService extends BaseService<Banner, Long> {
    BannerDTO byId(long id);
    List<BannerDTO> getAllBanner();
    List<BannerDTO> getListBannerFilterBySectionSize(Float scale, Long sectionId);
    List<BannerDTO> getListBannerBySection(Long sectionId);
    BannerDTO getRandomBannerInSection(Long sectionId);
    BannerDTO getBannerByPercentageInSection(Long sectionId);
    List<BannerDTO> getListBannerPopUpByPage(Long pageId);
    List<BannerDTO> getListBannerPopUpNotInPage(Long pageId);
    BannerDTO getByCode(String code);
    BannerDTO getBannerHasMaxId();

}
