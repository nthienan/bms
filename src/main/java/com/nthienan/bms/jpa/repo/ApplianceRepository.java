package com.nthienan.bms.jpa.repo;

import com.nthienan.bms.jpa.entity.Appliance;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Service;

/**
 * Created on 14/06/2016.
 *
 * @author nthienan
 */
@Service
public interface ApplianceRepository extends PagingAndSortingRepository<Appliance, Long>, JpaSpecificationExecutor<Appliance> {
}
