package vn.project.affiliate.service;


import vn.project.affiliate.dto.SectionMappingDTO;
import vn.project.affiliate.entity.SectionMapping;

import java.util.List;

public interface SectionMappingService extends BaseService<SectionMapping, Long> {
    SectionMappingDTO byId(long id);
    SectionMapping save(SectionMapping section);
    List<SectionMappingDTO> getAllSection(int page, int size);
    List<SectionMappingDTO> getSectionMappingByPageUrl(String url,int websiteId);
    List<SectionMappingDTO> getSectionMappingByPageId(long id);
    void deleteByPageIdAndSectionId(long pageId, long sectionId);
    void deleteBySectionId(long sectionId);
}

