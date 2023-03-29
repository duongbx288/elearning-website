package vn.project.affiliate.repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import vn.project.affiliate.entity.WebsiteEntity;

import java.util.List;

@Repository
public interface WebsiteRepository extends BaseRepository<WebsiteEntity, Long> {
    List<WebsiteEntity> findByCode(String code);
    WebsiteEntity getByCode(String code);

       @Query(value="select * from websites where domain = ?1 ", nativeQuery = true)
    WebsiteEntity findByDomainAndWebkey(String domain);

    @Query(value="select * from websites where code = ?1 and web_key = ?2", nativeQuery = true)
    WebsiteEntity findByDomainAndKey(String code, String webKey);


    @Query(value="select * from websites where code = ?1 and id not like ?2", nativeQuery = true)
    List<WebsiteEntity> findByCodeNotSameId(String code, long id);

    @Query(value="select websites.domain from pages left join websites on pages.website_id = websites.id order by pages.id", nativeQuery = true)
    List<String> getWebsiteDomainByPage();

    @Query(value = "SELECT websites.* FROM websites left join pages on websites.id = pages.website_id where pages.id = ?1", nativeQuery = true)
    WebsiteEntity getWebsiteEntityByPageId(Long pageId);

    @Query(value = "select websites.* from ((websites right join pages on websites.id = pages.website_id ) right join banner_mapping on pages.id =banner_mapping.page_id) where banner_mapping.banner_id = ?1\n" +
            " and banner_mapping.section_id = 0", nativeQuery = true)
    WebsiteEntity getWebCodeByBannerId(int bannerId);

    @Query(value = "SELECT distinct websites.* FROM ((((websites right join pages on websites.id = pages.website_id) right join section_mapping on section_mapping.page_id = pages.id)\n" +
            "right join banner_mapping on banner_mapping.section_id = section_mapping.section_id) right join banners on banners.id = banner_mapping.banner_id) where banners.id = ?1", nativeQuery = true)
    WebsiteEntity getWebViaSectionAndBannerId(int bannerId);

    @Modifying
    @Transactional
    @Query(value="delete section_mapping.* from section_mapping where page_id in (select pages.id from pages where website_id = ?1 )"
            , nativeQuery = true)
    void deleteSectionMapByWebId(long id);

    @Modifying
    @Transactional
    @Query(value="delete pages.* from pages where website_id = ?1 ", nativeQuery = true)
    void deletePageByWebId(long id);

    @Modifying
    @Transactional
    @Query(value=" delete websites.* from websites where id = ?1 ", nativeQuery = true)
    void deleteWeb(long id);

}

