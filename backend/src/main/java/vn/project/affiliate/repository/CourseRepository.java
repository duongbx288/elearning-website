package vn.project.affiliate.repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.relational.core.sql.In;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import vn.project.affiliate.entity.CourseEntity;

import java.util.List;

public interface CourseRepository extends BaseRepository<CourseEntity, Long>, CustomCourseRepository {

    @Query(value="select * from course where id = ?1", nativeQuery = true)
    CourseEntity getById(Integer id);

    List<CourseEntity> findByTeacherId(int id);

    List<CourseEntity> findByIdIn(List<Integer> id);

    @Modifying
    @Transactional
    @Query(value="update course s set s.status = ?1 where s.id = ?2", nativeQuery= true)
    void updateStatus(String status, int id);

    @Query(value="select * from course where id in (:listCourses)", nativeQuery = true)
    List<CourseEntity> findCoursesIn(@Param("listCourses") List<Integer> listCourses);

    @Query(value="select * from course where id not in (:listCourses) and status not like 'deleted' order by rating desc limit 5", nativeQuery = true)
    List<CourseEntity> findTopRatingCourseAndNotLearned(@Param("listCourses")List<Integer> listCourses);

    // Danh gia cao nhat
    @Query(value="select * from course where status not like 'deleted' order by rating desc limit 5", nativeQuery = true)
    List<CourseEntity> findTopRatingCourse();

    // Khoa hoc moi nhat
    @Query(value="select * from course where status not like 'deleted' order by id desc limit 5", nativeQuery = true)
    List<CourseEntity> findNewestCourse();

    // Khóa học top học viên
    @Query(value="select c.* from student_course sc, course c where sc.course_id = c.id group by sc.course_id order by count(sc.id) desc limit ?1", nativeQuery = true)
    List<CourseEntity> findTopCourse(int top);

    @Modifying
    @Transactional
    @Query(value="update course s set s.status = 'deleted' where s.id = ?1", nativeQuery = true)
    void deleteCourse(int id);
//    Page<CourseEntity> findByTeacherId(int id, Pageable pageable);

    // So hoc vien dang ki
    @Query(value="select count(*) from \n" +
            "(select distinct * from student_course sc where sc.course_id = ?1 group by sc.student_id) as sc", nativeQuery = true)
    int getStudentCount(int courseId);

    // So hoc vien hoan thanh
    @Query(value="select count(*) from \n" +
            "(select distinct * from student_course sc where sc.course_id = ?1 and sc.lesson_id = 0 group by sc.student_id) as sc", nativeQuery = true)
    int getStudentComplete(int courseId);

    @Query(value="select c.* from (course c right join order_items oi on oi.course_id = c.id) where c.teacher_id = ?1", nativeQuery = true)
    List<CourseEntity> getCourseSoldByTeacherId(int id);

    // Lay thong tin khoa hoc duoc mua top
    @Query(value="select count(c.id), c.* from ((course c right join order_items oi on oi.course_id = c.id) right join orders ord on ord.id = oi.order_id) where c.teacher_id = ?1 and ord.status = 'complete' group by c.id order by count(c.id) desc limit ?2", nativeQuery = true)
    List<CourseEntity> getTopCourseSoldByTeacherId(int id, int limit);

    // Lay so luong khoa hoc duoc ban
    @Query(value="select count(c.id) from ((course c right join order_items oi on oi.course_id = c.id) right join orders ord on ord.id = oi.order_id) where oi.course_id = ?1 and ord.status = 'complete'", nativeQuery = true)
    int countBoughtNumber(int courseId);

    // Lay khoa hoc duoc mua nhieu trong tuan
    @Query(value="c.* \n" +
            "from course c, order_items ot, (select ord.* from orders ord where yearweek(`created_at`, 1) = yearweek(curdate(),1)) as o \n" +
            "where c.id = ot.course_id and ot.order_id = o.id and c.teacher_id = ?1\n" +
            "and o.status = 'complete' \n" +
            "group by c.id \n" +
            "order by count(c.id) desc \n" +
            "limit ?2", nativeQuery = true)
    List<CourseEntity> getTopBoughtCourseWithinWeek(int teacherId, int limit);

    // Dem so luong mua cua khoa hoc trong tuan
    @Query(value="select count(ot.id)\n" +
            "from order_items ot, (select ord.* from orders ord where yearweek(`created_at`, 1) = yearweek(curdate(),1)) as o \n" +
            "where ot.order_id = o.id and ot.course_id = ?1\n" +
            "and o.status = 'complete'", nativeQuery = true)
    int countCourseBoughtWithinWeek(int courseId);

    // Trong thang
    @Query(value="select c.* \n" +
            "from course c, order_items ot, (select ord.* from orders ord where (ord.created_at between DATE_FORMAT(NOW() ,'%Y-%m-01') AND NOW())) as o \n" +
            "where c.id = ot.course_id and ot.order_id = o.id and c.teacher_id = ?1\n" +
            "and o.status = 'complete' \n" +
            "group by c.id \n" +
            "order by count(c.id) desc \n" +
            "limit ?2; ", nativeQuery = true)
    List<CourseEntity> getTopBoughtCourseWithinMonth(int teacherId, int limit);

    // Dem so luong mua cua khoa hoc trong thang
    @Query(value="select ot.*\n" +
            "from order_items ot, (select ord.* from orders ord where (ord.created_at between DATE_FORMAT(NOW() ,'%Y-%m-01') AND NOW())) as o \n" +
            "where ot.order_id = o.id and ot.course_id = ?1\n" +
            "and o.status = 'complete'", nativeQuery = true)
    int countCourseBoughtWithinMonth(int courseId);

    // Trong nam
    @Query(value="select c.* \n" +
            "from course c, order_items ot, (select ord.* from orders ord where year(ord.created_at) = year(current_date())) as o \n" +
            "where c.id = ot.course_id and ot.order_id = o.id and c.teacher_id = ?1\n" +
            "and o.status = 'complete' \n" +
            "group by c.id \n" +
            "order by count(c.id) desc \n" +
            "limit ?2", nativeQuery = true)
    List<CourseEntity> getTopBoughtCourseWithinYear(int teacherId, int limit);

    // Dem so luong mua cua khoa hoc trong nam
    @Query(value="select count(ot.id)\n" +
            "from order_items ot, (select ord.* from orders ord where year(ord.created_at) = year(current_date())) as o \n" +
            "where ot.order_id = o.id and ot.course_id = 3\n" +
            "and o.status = 'complete'", nativeQuery = true)
    int countCourseBoughtWithinYear(int courseId);

    // Trong 1 thang cua 1 nam bat ky
    @Query(value="select c.* \n" +
            "from course c, order_items ot, (select ord.* from orders ord where month(ord.created_at) = ?1 and year(ord.created_at) = ?2) as o \n" +
            "where c.id = ot.course_id and ot.order_id = o.id and c.teacher_id = ?3\n" +
            "and o.status = 'complete' \n" +
            "group by c.id \n" +
            "order by count(c.id) desc \n" +
            "limit ?4", nativeQuery = true)
    List<CourseEntity> getTopBoughtCourseInParticularMonth(int month, int year, int teacherId, int limit);

    // Dem so luong mua cua khoa hoc trong 1 thang bat ki
    @Query(value="select count(ot.id) \n" +
            "from order_items ot, (select ord.* from orders ord where month(ord.created_at) = ?1 and year(ord.created_at) = ?2) as o \n" +
            "where ot.order_id = o.id and ot.course_id = ?3\n" +
            "and o.status = 'complete'", nativeQuery = true)
    int countCourseOfAnyMonth(int month, int year, int courseId);

}
