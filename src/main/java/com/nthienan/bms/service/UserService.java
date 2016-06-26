package com.nthienan.bms.service;

import com.nthienan.bms.jpa.entity.User;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

/**
 * Created on 10/06/2016.
 *
 * @author nthienan
 */
public interface UserService {

    @NotNull
    User create(@NotNull User user);

    @Nullable
    User getById(@NotNull Long userId);

    @Nullable
    List<User> search(@NotNull Specification<User> specification);
}
