package vn.project.affiliate.service.impl;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.project.affiliate.repository.WebsiteRepository;
import vn.project.affiliate.dto.WebsiteDTO;
import vn.project.affiliate.entity.WebsiteEntity;
import vn.project.affiliate.mapper.WebsiteMapper;
import vn.project.affiliate.service.WebsiteService;

import java.util.List;

@Slf4j
@Service
public class WebsiteServiceImpl extends BaseServiceImpl<WebsiteEntity, Long > implements WebsiteService {

    private final WebsiteRepository websiteRepository;
    private final WebsiteMapper websiteMapper;

    public WebsiteServiceImpl(WebsiteRepository websiteRepository, WebsiteMapper websiteMapper){
        super(websiteRepository);
        this.websiteRepository = websiteRepository;
        this.websiteMapper = websiteMapper;
    }

    @Override
    public WebsiteDTO getWebCodeByBannerId(int bannerId) {
        var website = websiteRepository.getWebCodeByBannerId(bannerId);
        return websiteMapper.toDto(website);
    }

    @Override
    public WebsiteDTO byId(long id){
        var website = findById(id).orElse(null);
        return websiteMapper.toDto(website);
    }

    @Override
    public WebsiteDTO byCode(String code){
        var website = websiteRepository.getByCode(code);
        return websiteMapper.toDto(website);
    }

    @Override
    public WebsiteDTO findByDomainAndKey(String code, String webKey) {
        var website = findByDomainAndKey(code, webKey);
        return website;
    }

    @Override
    public List<WebsiteDTO> findAllWebsite(){
        var websites = findAll();
        return websiteMapper.toDto(websites);
    }

    @Override
    public WebsiteDTO getWebViaSectionAndBannerId(int bannerId) {
        var website = websiteRepository.getWebViaSectionAndBannerId(bannerId);
        return websiteMapper.toDto(website);
    }

    @Override
    public Page<WebsiteEntity> findAllWebsitePagination(int pageNumber){
        Pageable pageable = PageRequest.of(pageNumber, 5);
        var websites = findAll(pageable);
        return websites;
    }

    @Override
    public WebsiteDTO getWebsiteEntityByPageId(Long pageId) {
        var website = websiteRepository.getWebsiteEntityByPageId(pageId);
        return websiteMapper.toDto(website);
    }

    @Override
    public WebsiteDTO checkDomainAndWebKey(String domain){
        var website = websiteRepository.findByDomainAndWebkey(domain);
        return websiteMapper.toDto(website);
    }

    @Override
    public List<String> getWebsiteDomainByPageId(){
        var webDomains = websiteRepository.getWebsiteDomainByPage();
        return webDomains;
    }

    @Override
    public boolean deleteWebsite(long id){
        try{
            websiteRepository.deleteSectionMapByWebId(id);
            websiteRepository.deletePageByWebId(id);
            websiteRepository.deleteWeb(id);
        } catch (Exception e){
            log.error(e.toString());
            return false;
        }
        return true;
    }

    @Override
    public boolean saveNewWebsite(WebsiteDTO websiteDTO){
        var existWebsite = websiteRepository.findByCode(websiteDTO.getCode());

        if(existWebsite.isEmpty()){
            WebsiteEntity website = websiteMapper.toEntity(websiteDTO);
            save(website);
            return true;
        } else {
            System.out.println("Website code already exists.");
            return false;
        }
    }

    @Override
    public boolean updateWebsite(WebsiteDTO websiteDTO){
        var existWebsite = findById(websiteDTO.getId());

        if(existWebsite.isEmpty()){
            System.out.println("Website does not exist");
            return false;
        }

        String existWebsiteCode = existWebsite.get().getCode();
        var existWebsiteCodes = websiteRepository.findByCodeNotSameId(websiteDTO.getCode(), websiteDTO.getId());


        if(!existWebsiteCodes.isEmpty()){
            System.out.println("Duplicate code in DB");
            return false;
        }

        try{
            WebsiteEntity website = websiteMapper.toEntity(websiteDTO);
            save(website);
        } catch(Exception e){
            log.error(e.toString());
            return false;
        }
        return true;
    }


}
