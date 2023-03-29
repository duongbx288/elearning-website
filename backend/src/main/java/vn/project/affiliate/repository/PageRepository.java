package vn.project.affiliate.repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import vn.project.affiliate.entity.PageEntity;

import java.util.List;

@Repository
public interface PageRepository extends BaseRepository<PageEntity, Long> {

//    @Query(value = "select * from pages where website_id = ?1", nativeQuery = true)
//    Page<PageEntity> getBannerByUserAdd(int websiteId, Pageable pageable);
    List<PageEntity> findByPageName(String name);

    @Query(value = "select * from pages where name = ?1 and id not like ?2", nativeQuery = true)
    List<PageEntity> getByPageName(String name, long id);

    @Query(value = "select * from pages where website_id = ?1 and url = ?2", nativeQuery = true)
    List<PageEntity> getByPageUrl(int webId, String pageUrl);

    @Query(value = "select * from pages where website_id = ?1 and url = ?2", nativeQuery = true)
    PageEntity findByPageUrlAndWebId(int webId, String pageUrl);

    PageEntity findByPageUrl(String pageUrl);

    @Query(value = "select pages.* from pages right join websites on websites.id = pages.website_id where websites.code = ?1 and pages.name = ?2", nativeQuery = true)
    PageEntity getPageByWebCodeAndPageName(String webCode, String pageName);

    List<PageEntity> getByWebsiteId(int id);

    @Query(value="select * from pages where url = ?1 and id not like ?2 and website_id = ?3", nativeQuery = true)
    List<PageEntity> findByUrlNotSameId(String url, long id, int webId);

    @Query(value = "select count(id) from pages where website_id = ?1", nativeQuery = true)
    int countByWebsiteId(long websiteId);

    @Query(value = "SELECT pages.* FROM pages left join websites on pages.website_id = websites.id where websites.code = ?1 and websites.web_key =?2", nativeQuery = true)
    List<PageEntity> getByWebsiteCode(String code, String webKey);

    @Query(value = "SELECT pages.* FROM pages left join websites on pages.website_id = websites.id where websites.code = ?1", nativeQuery = true)
    List<PageEntity> getListPageByWebCode(String code);

    @Query(value = "select pages.* from pages right join banner_mapping on pages.id =banner_mapping.page_id where banner_mapping.banner_id = ?1 and banner_mapping.section_id = 0", nativeQuery = true)
    List<PageEntity> getListPageByBannerId(Integer bannerId);

    @Query(value = "SELECT distinct pages.* FROM (((pages right join section_mapping on section_mapping.page_id = pages.id)\n" +
            "right join banner_mapping on banner_mapping.section_id = section_mapping.section_id) right join banners on banners.id = banner_mapping.banner_id) where banners.id = ?1", nativeQuery = true)
    PageEntity getPageViaSectionAndBanner(Integer bannerId);

    @Query(value = "SELECT distinct pages.*\n" +
            "FROM ((pages\n" +
            "right join banner_mapping on banner_mapping.page_id = pages.id) \n" +
            "right join banners on banners.id = banner_mapping.banner_id) where banners.id = ?1", nativeQuery = true)
    List<PageEntity> getListPageWithBannerPopUp(Long bannerId);

    @Query(value = "SELECT distinct pages.* \n" +
            "FROM (((pages\n" +
            "right join section_mapping on section_mapping.page_id = pages.id) right join banner_mapping on banner_mapping.section_id = section_mapping.section_id)\n" +
            "right join banners on banners.id = banner_mapping.banner_id) where banners.id = ?1", nativeQuery = true)
    List<PageEntity> getListPageWithBannerSection(Long bannerId);

    @Modifying
    @Transactional
    @Query(value = "delete pages.* from pages where id = ?1 ", nativeQuery = true)
    void deletePage(long id);

    @Modifying
    @Transactional
    @Query(value = "delete section_mapping.* from section_mapping where page_id = ?1", nativeQuery = true)
    void deleteSectionMappingByPage(long id);
}
