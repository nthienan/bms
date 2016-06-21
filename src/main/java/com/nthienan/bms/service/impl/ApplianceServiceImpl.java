package com.nthienan.bms.service.impl;

import com.nthienan.bms.model.Appliance;
import com.nthienan.bms.repository.ApplianceRepository;
import com.nthienan.bms.service.ApplianceService;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Created on 14/06/2016.
 *
 * @author nthienan
 */
@Service
public class ApplianceServiceImpl implements ApplianceService {

    @Autowired
    ApplianceRepository applianceRepository;

    @Override
    @NotNull
    public Appliance create(@NotNull Appliance appliance) {
        return applianceRepository.save(appliance);
    }

    @Override
    @Nullable
    public Appliance getById(@NotNull Long applianceId) {
        return applianceRepository.findOne(applianceId);
    }

    @Override
    @Nullable
    public Iterable<Appliance> getAll() {
        return applianceRepository.findAll();
    }

    @Override
    public Page<Appliance> getPage(Pageable pageable) {
        return applianceRepository.findAll(pageable);
    }
}
