package vn.project.affiliate.service.impl;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.project.affiliate.repository.SectionMappingRepository;
import vn.project.affiliate.dto.SectionMappingDTO;
import vn.project.affiliate.entity.SectionMapping;
import vn.project.affiliate.mapper.SectionMappingMapper;
import vn.project.affiliate.service.SectionMappingService;

import java.util.List;

@Slf4j
@Service
public class SectionMappingServiceImpl extends BaseServiceImpl<SectionMapping, Long> implements SectionMappingService {

    private final SectionMappingRepository sectionMappingRepository;
    private final SectionMappingMapper sectionMappingMapper;

    public SectionMappingServiceImpl(
            SectionMappingRepository sectionMappingRepository, SectionMappingMapper sectionMappingMapper
    ) {
        super(sectionMappingRepository);
        this.sectionMappingRepository = sectionMappingRepository;
        this.sectionMappingMapper = sectionMappingMapper;
    }

    @Override
    public SectionMappingDTO byId(long id) {
        var sectionMapping = findById(id).orElse(null);
        return sectionMappingMapper.toDto(sectionMapping);
    }

    @Override
    public SectionMapping save(SectionMapping sectionMapping) {
        return super.save(sectionMapping);
    }

    @Override
    public List<SectionMappingDTO> getAllSection(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        List<SectionMapping> sections = findAll(pageable).getContent();
        return sectionMappingMapper.toDto(sections);
    }

    @Override
    public List<SectionMappingDTO> getSectionMappingByPageUrl(String url,int websiteId) {
        List<SectionMapping> sectionMappings = sectionMappingRepository.getSectionMappingByPageUrl(url,websiteId);
        return sectionMappingMapper.toDto(sectionMappings);
    }

    @Override
    public List<SectionMappingDTO> getSectionMappingByPageId(long id){
        var sectionMappings = sectionMappingRepository.getSectionMappingByPageId(id);
        return sectionMappingMapper.toDto(sectionMappings);
    }

    @Override
    public void deleteByPageIdAndSectionId(long pageId, long sectionId) {
        sectionMappingRepository.deleteByPageIdAndSectionId(pageId, sectionId);
    }

    @Override
    public void deleteBySectionId(long sectionId) {
        sectionMappingRepository.deleteBySectionId(sectionId);
    }
}
