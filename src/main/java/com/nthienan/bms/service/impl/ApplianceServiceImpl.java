package com.nthienan.bms.service.impl;

import com.nthienan.bms.jpa.entity.Appliance;
import com.nthienan.bms.jpa.repo.AclRepository;
import com.nthienan.bms.jpa.repo.ApplianceRepository;
import com.nthienan.bms.service.ApplianceService;
import com.nthienan.bms.util.SecurityUtil;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PostFilter;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.acls.domain.BasePermission;
import org.springframework.security.acls.domain.PrincipalSid;
import org.springframework.stereotype.Service;

/**
 * Created on 14/06/2016.
 *
 * @author nthienan
 */
@Service
public class ApplianceServiceImpl implements ApplianceService {

    @Autowired
    private ApplianceRepository applianceRepo;

    @Autowired
    private AclRepository aclRepository;

    @Override
    @NotNull
    public Appliance create(@NotNull Appliance appliance) {
        Appliance createdAppliance = applianceRepo.save(appliance);
        aclRepository.addPermission(createdAppliance, new PrincipalSid(SecurityUtil.getUsername()), BasePermission.ADMINISTRATION);
        return createdAppliance;
    }

    @Override
    @Nullable
    public Appliance getById(@NotNull Long applianceId) {
        return applianceRepo.findOne(applianceId);
    }

    @Override
    @Nullable
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostFilter("hasPermission(filterObject, 'read')")
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
