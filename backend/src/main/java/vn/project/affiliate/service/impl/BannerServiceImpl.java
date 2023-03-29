package vn.project.affiliate.service.impl;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import vn.project.affiliate.repository.BannerMappingRepository;
import vn.project.affiliate.repository.BannerRepository;
import vn.project.affiliate.dto.BannerDTO;
import vn.project.affiliate.entity.Banner;
import vn.project.affiliate.entity.BannerMapping;
import vn.project.affiliate.mapper.BannerMapper;
import vn.project.affiliate.service.BannerService;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class  BannerServiceImpl extends BaseServiceImpl<Banner, Long> implements BannerService {

    private final BannerRepository bannerRepository;
    private final BannerMapper bannerMapper;
    private final BannerMappingRepository bannerMappingRepository;

    public BannerServiceImpl(BannerRepository bannerRepository, BannerMapper bannerMapper,
                             BannerMappingRepository bannerMappingRepository) {
        super(bannerRepository);
        this.bannerRepository = bannerRepository;
        this.bannerMapper = bannerMapper;
        this.bannerMappingRepository = bannerMappingRepository;
    }

    @Override
    public BannerDTO byId(long id) {
        var banner = findById(id).orElse(null);
        return bannerMapper.toDto(banner);
    }

    @Override
    public BannerDTO getBannerHasMaxId() {
        var banner = bannerRepository.getBannerHasMaxId();
        return bannerMapper.toDto(banner);
    }

    @Override
    public List<BannerDTO> getAllBanner(){
        var dtoListBanner = getAll();
        return bannerMapper.toDto(dtoListBanner);
    }

    @Override
    public BannerDTO getRandomBannerInSection(Long sectionId) {
        Banner banner = bannerRepository.getRandomBannerInSection(sectionId);
        return bannerMapper.toDto(banner);
    }

    @Override
    public BannerDTO getBannerByPercentageInSection(Long sectionId){
        List<Long> bannerIdList = new ArrayList<Long>();
        ArrayList<Integer> percentageList = new ArrayList<Integer>();
        ArrayList<Integer> generatedResult = new ArrayList<Integer>();
        List<BannerMapping> bannerList = bannerMappingRepository.getListBannerMappingBySection(sectionId);
        for(BannerMapping bannerMappingEntity : bannerList){
            bannerIdList.add(bannerMappingEntity.getBannerId());
            percentageList.add(bannerMappingEntity.getPercentage());
            int temp = (int) Math.floor(Math.random()*bannerMappingEntity.getPercentage());
            generatedResult.add(temp);
        }
        if(bannerIdList.isEmpty()){
            return null;
        } else {
            int position = findTheLargest(generatedResult);
            var banner = findById(bannerIdList.get(position)).orElse(null);
            return bannerMapper.toDto(banner);
        }
    }

    // hàm tính toán lấy tỉ trọng
    int findTheLargest(ArrayList<Integer> array){
        int position = 0;
        try {
            int max = array.get(0);
            for (int i = 0; i < array.size(); i++){
                if(max < array.get(i)){
                    max = array.get(i);
                    position = i;
                }
            }
        } catch (IndexOutOfBoundsException e){
            e.printStackTrace();
            System.out.println("No banners available in the sections");
        }
        return position;
    }

    @Override
    public List<BannerDTO> getListBannerFilterBySectionSize(Float scale, Long sectionId) {
        List<Banner> dtoListBanner = bannerRepository.getListBannerFilterBySectionSize(scale,sectionId);
        return  bannerMapper.toDto(dtoListBanner);
    }

    @Override
    public List<BannerDTO> getListBannerBySection(Long sectionId) {
        List<Banner> dtoListBanner = bannerRepository.getListBannerBySection(sectionId);
        return bannerMapper.toDto(dtoListBanner);
    }

    @Override
    public BannerDTO getByCode(String code) {
        Banner banner = bannerRepository.getByCode(code);
        return bannerMapper.toDto(banner);
    }

    @Override
    public List<BannerDTO> getListBannerPopUpByPage(Long pageId) {
        List<Banner> bannerList = bannerRepository.getListBannerPopUpByPage(pageId);
        return bannerMapper.toDto(bannerList);
    }

    @Override
    public List<BannerDTO> getListBannerPopUpNotInPage(Long pageId) {
        List<Banner> bannerList = bannerRepository.getListBannerPopUpNotInPage(pageId);
        return bannerMapper.toDto(bannerList);
    }

    @Override
    public Banner save(Banner entity) {
        return super.save(entity);
    }

}
