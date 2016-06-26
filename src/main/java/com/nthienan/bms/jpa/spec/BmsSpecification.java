package com.nthienan.bms.jpa.spec;

import com.nthienan.bms.jpa.entity.BasicEntity;
import org.apache.log4j.Logger;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.lang.reflect.Field;

/**
 * Created on 6/25/2016.
 *
 * @author nthienan
 */
public class BmsSpecification<T extends BasicEntity> implements Specification<T> {
    private static final Logger log = Logger.getLogger(BmsSpecification.class);
    private SearchCriteria criteria;

    public BmsSpecification(SearchCriteria criteria) {
        this.criteria = criteria;
    }

    @Override
    public Predicate toPredicate(Root<T> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
        Class<T> entityType = root.getModel().getBindableJavaType();
        Object oriValue = null;
        try {
            oriValue = convertToOrigType(entityType, criteria);
        } catch (NoSuchFieldException e) {
            log.error("Could not convert search criteria to original type", e);
            return null;
        }
        switch (criteria.getOperation()) {
            case EQUALITY:
                return builder.equal(root.get(criteria.getKey()), oriValue);
            case NEGATION:
                return builder.notEqual(root.get(criteria.getKey()), oriValue);
            case GREATER_THAN:
                return builder.greaterThan(root.get(criteria.getKey()), criteria.getValue().toString());
            case LESS_THAN:
                return builder.lessThan(root.get(criteria.getKey()), criteria.getValue().toString());
            case LIKE:
                return builder.like(root.get(criteria.getKey()), criteria.getValue().toString());
            case STARTS_WITH:
                return builder.like(root.get(criteria.getKey()), criteria.getValue() + "%");
            case ENDS_WITH:
                return builder.like(root.get(criteria.getKey()), "%" + criteria.getValue());
            case CONTAINS:
                return builder.like(root.get(criteria.getKey()), "%" + criteria.getValue() + "%");
            default:
                return null;
        }
    }

    private Object convertToOrigType(Class<?> entityType, SearchCriteria criteria) throws NoSuchFieldException {
        Field field = entityType.getDeclaredField(criteria.getKey());
        Class<?> fieldType = field.getType();
        if (String.class.equals(fieldType)) {
            return String.valueOf(criteria.getValue());
        } else if (boolean.class.equals(fieldType)) {
            return Boolean.valueOf(criteria.getValue().toString());
        }
        return null;
    }
}
