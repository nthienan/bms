package com.nthienan.bms.repository;

import com.nthienan.bms.model.User;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

/**
 * Created on 10/06/2016.
 *
 * @author nthienan
 */
@Service
public interface UserRepository extends CrudRepository<User, Long> {

    /**
     * @param username an username
     * @return user if exits, otherwise null
     */
    @Nullable
    User findByUsername(@NotNull String username);
}
