package com.nthienan.bms.rest.controller;

import com.google.common.base.Joiner;
import com.nthienan.bms.jpa.entity.BasicEntity;
import com.nthienan.bms.jpa.spec.SearchOperation;
import com.nthienan.bms.jpa.spec.SpecificationsBuilder;
import org.jetbrains.annotations.Nullable;
import org.springframework.data.jpa.domain.Specification;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created on 6/26/2016.
 *
 * @author nthienan
 */
public final class ControllerHelper {

    private ControllerHelper() {
    }

    /**
     * Helper method that will build specification base on query string, which passed as parameter
     *
     * @param queryStr query string
     *                 <p> {@code Ex: query=lastName:*e*;builtIn:false}</p>
     *                 <p>See {@link SearchOperation} for more support operations</p>
     * @param <T>      an basic entity
     * @return {@link Specification} instance
     */
    @Nullable
    public static <T extends BasicEntity> Specification<T> buildSpec(String queryStr) {
        SpecificationsBuilder<T> specBuilder = new SpecificationsBuilder<>();
        String operationSet = Joiner.on("|").join(SearchOperation.SIMPLE_OPERATION_SET);
        Pattern pattern = Pattern.compile("(\\w+?)(" + operationSet + ")(\\p{Punct}?)(\\w+?)(\\p{Punct}?);");
        Matcher matcher = pattern.matcher(queryStr + ";");
        while (matcher.find()) {
            SearchOperation operation = SearchOperation.getSimpleOperation(matcher.group(2).charAt(0));
            if (operation != null) {
                specBuilder.with(matcher.group(1), operation, matcher.group(4), matcher.group(3), matcher.group(5));
            }
        }
        return specBuilder.build();
    }
}
