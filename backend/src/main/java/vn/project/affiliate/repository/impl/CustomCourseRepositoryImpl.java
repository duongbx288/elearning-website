package vn.project.affiliate.repository.impl;

import org.springframework.data.domain.*;
import vn.project.affiliate.dto.request.CourseCriteria;
import vn.project.affiliate.entity.CourseEntity;
import vn.project.affiliate.repository.CustomCourseRepository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class CustomCourseRepositoryImpl implements CustomCourseRepository {

    @PersistenceContext
    private EntityManager em;

    @Override
    public Page<CourseEntity> findCourses(CourseCriteria criteria) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<CourseEntity> cq = cb.createQuery(CourseEntity.class);
        Root<CourseEntity> course = cq.from(CourseEntity.class);

        // Pagination
        Pageable pageable = PageRequest.of(criteria.getPage(), criteria.getLimit());

        // Criteria
        List<Predicate> predicates = new ArrayList<>();
        Predicate status = cb.notLike(course.get("status"), "deleted");
        predicates.add(status);

        if (criteria.getName() != null && !criteria.getName().equals("")) {
            Predicate name = cb.like(course.get("name"), "%" + criteria.getName() + "%");
            predicates.add(name);
        }
        if (criteria.getMaxPrice() != null) {
            Predicate maxPrice = cb.lessThanOrEqualTo(course.get("price"),criteria.getMaxPrice());
            predicates.add(maxPrice);
        }
        if (criteria.getMinPrice() != null) {
            Predicate minPrice = cb.greaterThanOrEqualTo(course.get("price"), criteria.getMinPrice());
            predicates.add(minPrice);
        }
        if (criteria.getCreatedDate() != null) {
            Predicate date = cb.greaterThanOrEqualTo(course.<Date>get("created_at"), criteria.getCreatedDate());
            predicates.add(date);
        }
        if (criteria.getRating() != null) {
            Predicate rating = cb.greaterThanOrEqualTo(course.get("rating"), criteria.getRating());
            predicates.add(rating);
        }
        if (criteria.getTypeId() != null) {
            CriteriaBuilder.In<Integer> inClause = cb.in(course.get("typeId"));
            for (Integer typeId : criteria.getTypeId()) {
                inClause.value(typeId);
            }
            Predicate type = inClause;
            predicates.add(type);
        }



        // Add predicate to criteria query
        Predicate finalQuery = cb.and(predicates.toArray(Predicate[]::new));
        cq.where(finalQuery);

        // Get result
        TypedQuery<CourseEntity> query = em.createQuery(cq).setFirstResult((int) pageable.getOffset()).setMaxResults(pageable.getPageSize());
        List<CourseEntity> df = query.getResultList();

        // Create Count query
        CriteriaQuery<Long> countQuery = cb.createQuery(Long.class);
        Root<CourseEntity> bookCount = countQuery.from(CourseEntity.class);
        countQuery.select(cb.count(bookCount)).where(cb.and(predicates.toArray(Predicate[]::new)));
        Long count = em.createQuery(countQuery).getSingleResult();

        Page<CourseEntity> page = new PageImpl<>(df, pageable, count);
        return page;
    }
}
