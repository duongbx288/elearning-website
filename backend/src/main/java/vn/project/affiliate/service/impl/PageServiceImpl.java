package vn.project.affiliate.service.impl;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.project.affiliate.repository.PageRepository;
import vn.project.affiliate.dto.PageDTO;
import vn.project.affiliate.entity.PageEntity;
import vn.project.affiliate.mapper.PageMapper;
import vn.project.affiliate.service.PageService;

import java.util.List;

@Slf4j
@Service
public class PageServiceImpl extends BaseServiceImpl<PageEntity, Long> implements PageService {

    private final PageRepository pageRepository;
    private final PageMapper pageMapper;

    public PageServiceImpl(
            PageRepository pageRepository, PageMapper pageMapper
    ){
        super(pageRepository);
        this.pageRepository = pageRepository;
        this.pageMapper = pageMapper;
    }

    @Override
    public PageDTO getPageByWebCodeAndPageName(String webCode, String pageName) {
        var page = pageRepository.getPageByWebCodeAndPageName(webCode, pageName);
        return pageMapper.toDto(page);
    }

    @Override
    public PageDTO byId(long id) {
        var page = findById(id).orElse(null);
        return pageMapper.toDto(page);
    }

    @Override
    public List<PageDTO> getListPageByBannerId(int bannerId) {
        var pages = pageRepository.getListPageByBannerId(bannerId);
        return pageMapper.toDto(pages);
    }

    @Override
    public PageDTO getPageViaSectionAndBanner(int bannerId) {
        var page = pageRepository.getPageViaSectionAndBanner(bannerId);
        return pageMapper.toDto(page);
    }

    @Override
    public PageDTO byPageUrl(String url){
        var page = pageRepository.findByPageUrl(url);
        return pageMapper.toDto(page);
    }

    @Override
    public PageDTO findByPageUrlAndWebId(int webId, String url){
        var page = pageRepository.findByPageUrlAndWebId(webId, url);
        return pageMapper.toDto(page);
    }

    @Override
    public List<PageDTO> findAllPage(){
        var pages = findAll();
        return pageMapper.toDto(pages);
    }

    @Override
    public Page<PageEntity> findAllPagePagination(int pageNumber){
        Pageable pageable = PageRequest.of(pageNumber, 5);
        return findAll(pageable);
    }

    @Override
    public List<PageDTO> getListPageWithBannerPopUp(Long bannerId) {
        var pageList = pageRepository.getListPageWithBannerPopUp(bannerId);
        return pageMapper.toDto(pageList);
    }

    @Override
    public List<PageDTO> getListPageWithBannerSection(Long bannerId) {
        var pageList = pageRepository.getListPageWithBannerSection(bannerId);
        return pageMapper.toDto(pageList);
    }

    @Override
    public List<PageDTO> findPagePagination(int pageNumber, int pageSize){
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        var pages = findAll(pageable).getContent();
        return pageMapper.toDto(pages);
    }

    @Override
    public List<PageDTO> findPageByWebsiteId(int websiteId){
        var pages = pageRepository.getByWebsiteId(websiteId);
        return pageMapper.toDto(pages);
    }
    @Override
    public List<PageDTO> getListPageByWebCode(String code) {
        List<PageEntity> pageEntityList = pageRepository.getListPageByWebCode(code);
        return pageMapper.toDto(pageEntityList);
    }
    @Override
    public List<PageDTO> getListPageByWebCode(String code, String webKey) {
        List<PageEntity> listPage = pageRepository.getByWebsiteCode(code, webKey);
        return pageMapper.toDto(listPage);
    }

    @Override
    public Integer countByWebsiteId(int websiteId){
        var count = pageRepository.countByWebsiteId(websiteId);
        return count;
    }

    @Override
    public boolean deletePage(long id){
        try {
            pageRepository.deleteSectionMappingByPage(id);
            pageRepository.deletePage(id);
        } catch (Exception e){
            log.error(e.toString());
            return false;
        }
        return true;
    }

    @Override
    public String saveNewPage(PageDTO pageDTO){
        var existPages = pageRepository.getByPageUrl(pageDTO.getWebsiteId(), pageDTO.getPageUrl());
        if(!existPages.isEmpty()){
            System.out.println("Page URL already exists.");
            return "duplicate";
        }
        try {
            PageEntity page = pageMapper.toEntity(pageDTO);
            save(page);
        } catch (Exception e){
            log.error(e.toString());
            return "error";
        }
        return "success";
    }

    @Override
    public String updatePage(PageDTO pageDTO) {

        var existPageUrls = pageRepository.findByUrlNotSameId(pageDTO.getPageUrl(), pageDTO.getId(), pageDTO.getWebsiteId());
        if(!existPageUrls.isEmpty()){
            System.out.println("Duplicate page url in DB");
            return "duplicate";
        }

        try{
            PageEntity page = pageMapper.toEntity(pageDTO);
            save(page);
        } catch(Exception e){
            log.error(e.toString());
            return "error";
        }
        return "success";

    }

}
