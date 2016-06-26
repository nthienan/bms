package com.nthienan.bms.jpa.spec;

import com.nthienan.bms.jpa.entity.BasicEntity;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.domain.Specifications;

import java.util.ArrayList;
import java.util.List;

/**
 * Created on 6/25/2016.
 *
 * @author nthienan
 */
public class SpecificationsBuilder<T extends BasicEntity> {

    @NotNull
    private final List<SearchCriteria> criterias;

    public SpecificationsBuilder() {
        criterias = new ArrayList<>();
    }

    @NotNull
    public SpecificationsBuilder<T> with(String key, SearchOperation operation, Object value) {
        criterias.add(new SearchCriteria(key, operation, value));
        return this;
    }

    public SpecificationsBuilder<T> with(String key, @NotNull SearchOperation operation, Object value, String prefix, String suffix) {
        if (SearchOperation.EQUALITY.equals(operation)) {
            boolean startWithAsterisk = prefix.contains("*");
            boolean endWithAsterisk = suffix.contains("*");

            if (startWithAsterisk && endWithAsterisk) {
                operation = SearchOperation.CONTAINS;
            } else if (startWithAsterisk) {
                operation = SearchOperation.ENDS_WITH;
            } else if (endWithAsterisk) {
                operation = SearchOperation.STARTS_WITH;
            }
        }
        criterias.add(new SearchCriteria(key, operation, value));
        return this;
    }

    @Nullable
    public Specification<T> build() {
        if (criterias.isEmpty()) {
            return null;
        }

        List<Specification<T>> specs = new ArrayList<>();
        for (SearchCriteria param : criterias) {
            specs.add(new BmsSpecification<T>(param));
        }

        Specification<T> result = specs.get(0);
        for (int i = 1; i < specs.size(); i++) {
            result = Specifications.where(result).and(specs.get(i));
        }
        return result;
    }
}
