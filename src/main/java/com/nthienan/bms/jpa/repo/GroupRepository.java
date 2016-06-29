package com.nthienan.bms.jpa.repo;

import com.nthienan.bms.jpa.entity.Group;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * Created on 6/28/2016.
 *
 * @author nthienan
 */
public interface GroupRepository extends PagingAndSortingRepository<Group, Long>, JpaSpecificationExecutor<Group> {
}
