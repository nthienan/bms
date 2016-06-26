package com.nthienan.bms.service.impl;

import com.nthienan.bms.jpa.entity.Appliance;
import com.nthienan.bms.jpa.repo.ApplianceRepository;
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
    ApplianceRepository applianceRepo;

    @Override
    @NotNull
    public Appliance create(@NotNull Appliance appliance) {
        return applianceRepo.save(appliance);
    }

    @Override
    @Nullable
    public Appliance getById(@NotNull Long applianceId) {
        return applianceRepo.findOne(applianceId);
    }

    @Override
    @Nullable
    public Iterable<Appliance> getAll() {
        return applianceRepo.findAll();
    }

    @Override
    public Page<Appliance> getPage(Pageable pageable) {
        return applianceRepo.findAll(pageable);
    }

    @Override
    public void delete(Appliance appliance) {
        applianceRepo.delete(appliance);
    }

    @Override
    @NotNull
    public Appliance update(@NotNull Appliance appliance) {
        return applianceRepo.save(appliance);
    }
}
