package vn.project.affiliate.service.impl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import vn.project.affiliate.repository.BannerMappingRepository;
import vn.project.affiliate.service.BannerMappingService;
import vn.project.affiliate.dto.BannerMappingDTO;
import vn.project.affiliate.entity.BannerMapping;
import vn.project.affiliate.mapper.BannerMappingMapper;

import java.util.List;

@Slf4j
@Service
public class BannerMappingServiceImpl extends BaseServiceImpl<BannerMapping, Long> implements BannerMappingService {
    private final BannerMappingRepository bannerMappingRepository;
    private final BannerMappingMapper bannerMappingMapper;

    public BannerMappingServiceImpl(BannerMappingRepository bannerMappingRepository, BannerMappingMapper bannerMappingMapper  ) {
        super(bannerMappingRepository);
        this.bannerMappingRepository = bannerMappingRepository;
        this.bannerMappingMapper = bannerMappingMapper;
    }

    @Override
    public BannerMappingDTO getBannerMappingByBannerIdAndPageId(long bannerId, long pageId) {
        var bannerMapping = bannerMappingRepository.getBannerMappingByBannerIdAndPageId(bannerId, pageId);
        return bannerMappingMapper.toDto(bannerMapping);
    }

    @Override
    public BannerMappingDTO getBannerMappingByBannerIdAndSectionId(long bannerId, long sectionId) {
        var bannerMapping = bannerMappingRepository.getBannerMappingByBannerIdAndSectionId(bannerId, sectionId);
        return bannerMappingMapper.toDto(bannerMapping);
    }


    @Override
    public BannerMappingDTO byId(long id) {
        var bannerMapping = findById(id).orElse(null);
        return bannerMappingMapper.toDto(bannerMapping);
    }

    @Override
    public List<BannerMappingDTO> getAllBannerMapping(){
        var dtoListBannerMapping = getAll();
        return bannerMappingMapper.toDto(dtoListBannerMapping);
    }


    @Override
    public List<BannerMappingDTO> getListBannerMappingBySection(long sectionId) {
        List<BannerMapping> dtoListBanner = bannerMappingRepository.getListBannerMappingBySection(sectionId);
        return  bannerMappingMapper.toDto(dtoListBanner);
    }

    @Override
    public BannerMapping save(BannerMapping bannerMapping) {
        return super.save(bannerMapping);
    }

    @Override
    public void deleteBannerMappingViaSection(long bannerId, long sectionId) {
        bannerMappingRepository.deleteBannerMappingViaSection(bannerId, sectionId);
    }

    @Override
    public List<BannerMappingDTO> getListBannerPopupByPage(long pageId) {
       List<BannerMapping> bannerMappings = bannerMappingRepository.getListBannerPopupByPage(pageId);
       return bannerMappingMapper.toDto(bannerMappings);
    }


    @Override
    public void deleteBannerMappingViaPage(long bannerId, long pageId) {
        bannerMappingRepository.deleteBannerMappingViaPage(bannerId, pageId);
    }

    @Override
    public void deleteByBannerId(long bannerId) {
        bannerMappingRepository.deleteByBannerId(bannerId);
    }

}
