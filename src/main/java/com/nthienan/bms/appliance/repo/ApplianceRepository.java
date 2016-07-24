package com.nthienan.bms.appliance.repo;

import com.nthienan.bms.appliance.model.Appliance;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created on 14/06/2016.
 *
 * @author nthienan
 */
@Transactional
@RestResource(path = "appliances")
public interface ApplianceRepository extends PagingAndSortingRepository<Appliance, Long>, JpaSpecificationExecutor<Appliance> {
}
