package com.nthienan.bms.service;

import com.nthienan.bms.jpa.entity.Appliance;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Created on 14/06/2016.
 *
 * @author nthienan
 */
public interface ApplianceService {

    @NotNull
    Appliance create(@NotNull Appliance appliance);

    @Nullable
    Appliance getById(@NotNull Long applianceId);

    @Nullable
    Iterable<Appliance> getAll();

    @Nullable
    Page<Appliance> getPage(Pageable pageable);

    void delete(@NotNull Appliance appliance);

    @NotNull
    Appliance update(@NotNull Appliance appliance);
}
