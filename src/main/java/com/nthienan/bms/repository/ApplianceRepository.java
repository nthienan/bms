package com.nthienan.bms.repository;

import com.nthienan.bms.model.Appliance;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Service;

/**
 * Created on 14/06/2016.
 *
 * @author nthienan
 */
@Service
public interface ApplianceRepository extends PagingAndSortingRepository<Appliance, Long> {
}
