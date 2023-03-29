package vn.project.affiliate.repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import vn.project.affiliate.entity.StudentEntity;
import vn.project.affiliate.entity.WebsiteEntity;

import java.util.List;

public interface StudentRepository extends BaseRepository<StudentEntity, Long> {

    @Query(value="select * from student where id = ?1", nativeQuery = true)
    StudentEntity getById(Long id);

    StudentEntity getByName(String name);

    @Query(value="select * from student where student_code = ?1 and id not like ?2", nativeQuery = true)
    List<StudentEntity> findByCodeNotSameId(String code, long id);

    @Modifying
    @Transactional
    @Query(value="update student s set s.status = ?1 where s.id = ?2", nativeQuery= true)
    void updateStatus(String status, int id);

    @Modifying
    @Transactional
    @Query(value="update student s set s.status = 'deleted' where s.id = ?1", nativeQuery = true)
    void deleteStudent(int id);

    // So tien da chi
    @Query(value = "select sum(ord.total) from (orders ord right join user_account uc on ord.user_id = uc.user_id) where uc.student_id = ?1 and ord.status = 'complete'", nativeQuery = true)
    long countSumPurchased(int id);

    // So khoa hoc da mua
    @Query(value = "select count(id) from student_course sc where sc.student_id = ?1", nativeQuery = true)
    int countCoursesBought(int id);

    // So khoa hoc da hoan thanh
    @Query(value = "select count(id) from student_course sc where sc.student_id = ?1 and lesson_id = 0", nativeQuery = true)
    int countCoursesCompleted(int id);
}
