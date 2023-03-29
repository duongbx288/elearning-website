package vn.project.affiliate.service;


import org.springframework.data.domain.Page;
import vn.project.affiliate.dto.PageDTO;
import vn.project.affiliate.entity.PageEntity;

import java.util.List;

public interface PageService extends BaseService<PageEntity, Long> {

    PageDTO byId(long id);

    PageDTO findByPageUrlAndWebId(int id, String url);

    PageDTO byPageUrl(String url);

    PageDTO getPageByWebCodeAndPageName(String webCode, String pageName);

    List<PageDTO> findAllPage();

    Page<PageEntity> findAllPagePagination(int pageNumber);

    List<PageDTO> findPagePagination(int pageNumber, int pageSize);

    String saveNewPage(PageDTO pageDTO);

    String updatePage(PageDTO pageDTO);

    boolean deletePage(long id);

    List<PageDTO> findPageByWebsiteId(int websiteId);

    List<PageDTO> getListPageByWebCode(String code);

    List<PageDTO> getListPageByWebCode(String code, String webKey);

    Integer countByWebsiteId(int websiteId);

    PageDTO getPageViaSectionAndBanner(int bannerId);

    List<PageDTO> getListPageByBannerId(int bannerId);

    List<PageDTO> getListPageWithBannerPopUp(Long bannerId);

    List<PageDTO> getListPageWithBannerSection(Long bannerId);
}
