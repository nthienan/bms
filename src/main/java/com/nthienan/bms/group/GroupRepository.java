package com.nthienan.bms.group;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created on 6/28/2016.
 *
 * @author nthienan
 */
@Transactional
@RestResource(path = "groups")
public interface GroupRepository extends PagingAndSortingRepository<Group, Long>, JpaSpecificationExecutor<Group> {
}
