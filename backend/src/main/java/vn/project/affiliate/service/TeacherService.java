package vn.project.affiliate.service;

import org.springframework.data.domain.Page;
import org.springframework.transaction.annotation.Transactional;
import vn.project.affiliate.dto.TeacherDTO;
import vn.project.affiliate.entity.TeacherEntity;

import java.util.List;

public interface TeacherService extends BaseService<TeacherEntity, Long> {

    List<TeacherEntity> getAll();
    TeacherDTO getById(Integer id);
    Page<TeacherDTO> getByPagination(int pageNum, int pageLimit);

    @Transactional
    String updateTeacher(TeacherDTO teacherDTO);

    @Transactional
    TeacherDTO registerTeacher(TeacherDTO dto);

    @Transactional
    String updateStatus(int id, String status);

    String deleteTeacher(int id);
}
