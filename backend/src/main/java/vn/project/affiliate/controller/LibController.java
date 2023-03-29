package vn.project.affiliate.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.project.affiliate.dto.*;
import vn.project.affiliate.dto.response.BannerResponse;
import vn.project.affiliate.service.*;
import vn.project.affiliate.dto.*;
import vn.project.affiliate.service.*;


import java.util.ArrayList;
import java.util.List;


@Slf4j
@RequiredArgsConstructor
@RestController
@RestControllerAdvice
@CrossOrigin(origins = "*")
@RequestMapping("/lib_api/banners")
public class LibController {

    private final BannerService bannerService;
    private final BannerMappingService bannerMappingService;
    private final SectionService sectionService;
    private final SectionMappingService sectionMappingService;
    private final PageService pageService;


    //api lấy banner theo domain luôn
    @GetMapping("/by-code={code}/key={key}")
    public ResponseEntity<List<BannerResponse>> getListBannerByWebCode(@PathVariable("code") String code, @PathVariable("key") String key){
        List<PageDTO> pageEntityList = pageService.getListPageByWebCode(code, key);
        List<BannerResponse> bannerDTOList = new ArrayList<>();
        if(pageEntityList.size() > 0){
            for(int i = 0 ; i< pageEntityList.size(); i++){
                    List<SectionDTO> sections = sectionService.getSectionsInPage(pageEntityList.get(i).getPageUrl(),pageEntityList.get(i).getWebsiteId());
                List<SectionMappingDTO> sectionMappings = sectionMappingService.getSectionMappingByPageUrl(pageEntityList.get(i).getPageUrl(),pageEntityList.get(i).getWebsiteId());
                // lay banner thong qua section
                for(int k=0; k< sections.size(); k++) {
                    for(int j = 0 ; j < sectionMappings.size() ; j++) {
                        if(sections.get(k).getId() == sectionMappings.get(j).getSectionId()){
                            sections.get(k).setModeHide(sectionMappings.get(j).getModeHide());
                            sections.get(k).setTimeHide(sectionMappings.get(j).getTimeHide());
                            sections.get(k).setNumberHide(sectionMappings.get(j).getNumberHide());
                        }
                    }
                }
                for (int m = 0 ; m< sections.size(); m++) {
                    // kiểm tra trạng thái hiển thị của section(display mode): random <=> (0) hay tỉ trọng  <=> (1)
                    if (sections.get(m).getMode() == 0) {
                        BannerDTO bannerDTO = new BannerDTO();
                        try{
                            bannerDTO = bannerService.getRandomBannerInSection(sections.get(m).getId());
                        }catch (Exception e){
                            log.error("error | {} | {}",bannerDTO, e.toString());
                        }
                        if(bannerDTO != null){
                            BannerResponse bannerResponse = new BannerResponse(bannerDTO.getId(), sections.get(m).getDivId(),
                                    pageEntityList.get(i).getPageUrl(),bannerDTO.getCode(),
                                    bannerDTO.getTitle(), bannerDTO.getImgUrl(), bannerDTO.getUrl(), bannerDTO.getType(),
                                    bannerDTO.getPopUp(), bannerDTO.getModal(),0, 0,
                                    sections.get(m).getWidth(), sections.get(m).getHeight(),  bannerDTO.getBannerWidth(),
                                    sections.get(m).getModeHide(), sections.get(m).getTimeHide(), sections.get(m).getNumberHide(),"0","0","0");
                            bannerDTOList.add(bannerResponse);
                        }

                    }
                    // nếu là tỉ trọng
                    else {
                        BannerDTO bannerDTO = new BannerDTO();

                        try {
                            bannerDTO = bannerService.getBannerByPercentageInSection(sections.get(m).getId());

                        }catch (Exception e){
                            log.error("error | {} | {}",bannerDTO, e.toString());
                        }
                        if(bannerDTO != null){
                            BannerResponse bannerResponse1 = new BannerResponse(bannerDTO.getId(),sections.get(m).getDivId(),
                                    pageEntityList.get(i).getPageUrl(),bannerDTO.getCode(),
                                    bannerDTO.getTitle(), bannerDTO.getImgUrl(), bannerDTO.getUrl(), bannerDTO.getType(),
                                    bannerDTO.getPopUp(), bannerDTO.getModal(), 0, 0,
                                    sections.get(m).getWidth(), sections.get(m).getHeight(), bannerDTO.getBannerWidth(),
                                    sections.get(m).getModeHide(), sections.get(m).getTimeHide(), sections.get(m).getNumberHide(),"0","0","0");
                            bannerDTOList.add(bannerResponse1);
                        }
                    }
                }

                // lay banner popup truc tiep theo page neu co
                List<BannerMappingDTO> bannerMappingDTOS = bannerMappingService.getListBannerPopupByPage(pageEntityList.get(i).getId());
                if(bannerMappingDTOS.size() > 0){
                    for( int h = 0 ; h < bannerMappingDTOS.size() ; h ++) {
                        BannerDTO banner = bannerService.byId(bannerMappingDTOS.get(h).getBannerId());
                        if(banner != null){
                            BannerResponse bannerResponse = new BannerResponse(banner.getId(), "null",
                                    pageEntityList.get(i).getPageUrl(),banner.getCode(),
                                    banner.getTitle(), banner.getImgUrl(), banner.getUrl(), banner.getType(),
                                    banner.getPopUp(),banner.getModal(),bannerMappingDTOS.get(h).getTimeHide(),
                                    bannerMappingDTOS.get(h).getNumberHide(),banner.getWidth(), banner.getHeight(),banner.getBannerWidth(),
                                    (short)0,0, 0,bannerMappingDTOS.get(h).getPosition(),bannerMappingDTOS.get(h).getPositionValue(),
                                    bannerMappingDTOS.get(h).getPositionType());
                            bannerDTOList.add(bannerResponse);
                        }
                    }
                }

            }
        }
        return ResponseEntity.ok(bannerDTOList);
    }

}
