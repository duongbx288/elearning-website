package vn.project.affiliate.repository.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import vn.project.affiliate.dto.request.OrderItemCriteria;
import vn.project.affiliate.entity.OrderItemEntity;
import vn.project.affiliate.repository.CustomOrderItemsRepository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

public class CustomOrderItemsRepositoryImpl implements CustomOrderItemsRepository {

    @PersistenceContext
    private EntityManager em;

    @Override
    public Page<OrderItemEntity> findOrderItems(OrderItemCriteria criteria) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<OrderItemEntity> cq = cb.createQuery(OrderItemEntity.class);
        Root<OrderItemEntity> root = cq.from(OrderItemEntity.class);
        // Pagination
        Pageable pageable = PageRequest.of(criteria.getPage(), criteria.getLimit());

        // Criteria
        List<Predicate> predicates = new ArrayList<>();

        if (criteria.getMonth() != null) {
            Predicate month = cb.equal(cb.function("month", Integer.class, root.get("createdDate")), criteria.getMonth());
            predicates.add(month);
        }

        if (criteria.getYear() != null) {
            Predicate year = cb.equal(cb.function("year", Integer.class, root.get("createdDate")), criteria.getYear());
            predicates.add(year);
        }
        if (criteria.getAffiliateId() != null) {
            Predicate affId = cb.equal(root.get("affiliateId"), criteria.getAffiliateId());
            predicates.add(affId);
        }


        // Add predicate to criteria query
        Predicate finalQuery = cb.and(predicates.toArray(Predicate[]::new));
        cq.orderBy(cb.desc(root.get("createdDate")));
        cq.where(finalQuery);


        // Get result
        TypedQuery<OrderItemEntity> query = em.createQuery(cq).setFirstResult((int) pageable.getOffset()).setMaxResults(pageable.getPageSize());
        List<OrderItemEntity> df = query.getResultList();

        // Create Count query
        CriteriaQuery<Long> countQuery = cb.createQuery(Long.class);
        Root<OrderItemEntity> bookCount = countQuery.from(OrderItemEntity.class);
        countQuery.select(cb.count(bookCount)).where(cb.and(predicates.toArray(Predicate[]::new)));
        Long count = em.createQuery(countQuery).getSingleResult();

        Page<OrderItemEntity> orderItemEntities = new PageImpl<>(df, pageable, count);
        return orderItemEntities;
    }

}
