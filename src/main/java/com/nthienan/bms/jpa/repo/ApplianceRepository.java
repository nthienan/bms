package com.nthienan.bms.jpa.repo;

import com.nthienan.bms.jpa.entity.Appliance;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * Created on 14/06/2016.
 *
 * @author nthienan
 */
public interface ApplianceRepository extends PagingAndSortingRepository<Appliance, Long>, JpaSpecificationExecutor<Appliance> {
}
