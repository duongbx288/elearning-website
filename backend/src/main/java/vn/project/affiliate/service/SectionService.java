package vn.project.affiliate.service;


import org.springframework.data.domain.Page;
import vn.project.affiliate.dto.SectionDTO;
import vn.project.affiliate.entity.Section;

import java.util.List;

public interface SectionService extends BaseService<Section, Long> {
    SectionDTO byId(long id);
    Section save(Section section);
    List<SectionDTO> getAllSection(int page, int size);
    Page<Section> getAllSectionAndPagination(int page, int size);
    List<SectionDTO> getSectionsInPage(String url,int websiteId);
    List<SectionDTO> getSectionByPageId(long pageId);
    List<SectionDTO> getSectionAvailable(long pageId);
    List<SectionDTO> getAllSectionByPageId(long pageId);
    SectionDTO getBydCode(String code);
    SectionDTO getSectionHasMaxId();
    List<SectionDTO> getListSectionHasBannerIdAndPageId(long bannerId, long pageId);
}

