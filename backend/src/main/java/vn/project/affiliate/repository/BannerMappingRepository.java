package vn.project.affiliate.repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import vn.project.affiliate.entity.BannerMapping;

import java.util.List;

@Repository
public interface BannerMappingRepository extends BaseRepository<BannerMapping, Long> {

    @Query(value = "select * from banner_mapping where section_id = ?1", nativeQuery = true)
    List<BannerMapping> getListBannerMappingBySection(Long sectionId);

    @Query(value = "select * from banner_mapping where page_id = ?1", nativeQuery = true)
    List<BannerMapping> getListBannerPopupByPage(Long pageId);

    // lay ra cac banner popup trong chua gan vao page
    @Query(value = "SELECT  bm.* FROM banners as b inner join banner_mapping as bm on b.id = bm.banner_id inner join pages as p on bm.page_id = p.id where b.pop_up = 1 and b.id NOT IN (select banner_mapping.banner_id from banner_mapping where banner_mapping.page_id = ?1) and p.website_id = (select website_id from pages where id = ?1)", nativeQuery = true)
    List<BannerMapping> getListBannersMappingPopUpNotInPage(Long pageId);

    @Modifying
    @Query(value="delete from banner_mapping where banner_id = ?1 and section_id = ?2", nativeQuery = true)
    void deleteBannerMappingViaSection(Long bannerId, Long sectionId);

    @Modifying
    @Query(value="delete from banner_mapping where banner_id = ?1 and page_id = ?2", nativeQuery = true)
    void deleteBannerMappingViaPage(Long bannerId, Long pageId);

    @Modifying
    @Query(value = "delete from banner_mapping where banner_id IN (select banners.id from banners where id = ?1)", nativeQuery = true)
    void deleteByBannerId(Long bannerId);

    BannerMapping getBannerMappingByBannerIdAndPageId(Long bannerId, Long pageId);

    BannerMapping getBannerMappingByBannerIdAndSectionId(Long bannerId, Long sectionId);
}
