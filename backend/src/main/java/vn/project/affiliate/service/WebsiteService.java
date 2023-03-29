package vn.project.affiliate.service;

import org.springframework.data.domain.Page;
import vn.project.affiliate.dto.WebsiteDTO;
import vn.project.affiliate.entity.WebsiteEntity;

import java.util.List;

public interface WebsiteService extends BaseService<WebsiteEntity, Long> {
    WebsiteDTO byId(long id);

    WebsiteDTO byCode(String code);

    List<WebsiteDTO> findAllWebsite();

    Page<WebsiteEntity> findAllWebsitePagination(int pageNumber);

    boolean saveNewWebsite(WebsiteDTO websiteDTO);

    boolean updateWebsite(WebsiteDTO websiteDTO);

    WebsiteDTO checkDomainAndWebKey(String domain);

    WebsiteDTO findByDomainAndKey(String code, String webKey);

    WebsiteDTO getWebCodeByBannerId(int bannerId);
    List<String> getWebsiteDomainByPageId();
    WebsiteDTO getWebViaSectionAndBannerId(int bannerId);
    boolean deleteWebsite(long webId);

    WebsiteDTO getWebsiteEntityByPageId(Long pageId);
}
