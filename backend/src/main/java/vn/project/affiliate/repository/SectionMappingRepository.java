package vn.project.affiliate.repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import vn.project.affiliate.entity.SectionMapping;

import java.util.List;

@Repository
public interface SectionMappingRepository extends BaseRepository<SectionMapping, Long> {
    @Query(value = "SELECT * FROM section_mapping WHERE page_id = (SELECT id FROM pages WHERE url = ?1 and website_id =?2)", nativeQuery = true)
    List<SectionMapping> getSectionMappingByPageUrl(String url, int websiteId);

    @Query(value = "SELECT * FROM section_mapping as sm WHERE page_id = ?1 order by sm.id", nativeQuery = true)
    List<SectionMapping> getSectionMappingByPageId(long id);

    @Modifying
    @Query(value = "delete from section_mapping where page_id = ?1 and section_id = ?2", nativeQuery = true)
    void deleteByPageIdAndSectionId(long pageId, long sectionId);

    @Modifying
    @Query(value = "delete from section_mapping where section_id = ?1", nativeQuery = true)
    void deleteBySectionId(long sectionId);
}
