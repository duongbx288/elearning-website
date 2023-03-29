package vn.project.affiliate.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import vn.project.affiliate.entity.Section;

import java.util.List;

@Repository
public interface SectionRepository extends BaseRepository<Section, Long> {
    @Query(value = "select * from sections where id IN (select section_id from section_mapping where page_id = (select id from pages where url = ?1 and website_id=?2))", nativeQuery = true)
    List<Section> getAllSectionInPage(String url, int websiteId);

    @Query(value="SELECT s.* FROM section_mapping as sm left join sections as s on sm.section_id = s.id where page_id = ?1", nativeQuery = true)
    List<Section> getSectionByPageId(long pageId);

    @Query(value="SELECT * FROM sections where (id NOT IN (select section_id from section_mapping) or id NOT IN (select section_id from section_mapping where page_id = ?1))", nativeQuery = true)
    List<Section> getSectionAvailable(long pageId);

    @Query(value = "SELECT * FROM sections where (id IN  (select section_id from section_mapping where page_id = ?1))", nativeQuery = true)
    List<Section> getAllSectionByPageId(long pageId);
//SELECT sections.* FROM sections right join section_mapping on sections.id = section_mapping.section_id where section_mapping.page_id = 12
    Section getByCode(String code);

    @Query(value = "select * from sections order by id DESC limit 1" , nativeQuery = true)
    Section getSectionHasMaxId();

    @Query(value = "SELECT sections.* FROM sections right join banner_mapping on sections.id = banner_mapping.section_id where banner_mapping.banner_id = ?1 and banner_mapping.page_id = ?2", nativeQuery = true)
    List<Section> getListSectionHasBannerIdAndPageId(long bannerId, long pageId);
}
