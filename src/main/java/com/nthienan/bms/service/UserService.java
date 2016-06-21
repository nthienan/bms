package com.nthienan.bms.service;

import com.nthienan.bms.model.User;
import org.jetbrains.annotations.NotNull;

/**
 * Created on 10/06/2016.
 *
 * @author nthienan
 */
public interface UserService {

    @NotNull
    User create(@NotNull User user);
}
