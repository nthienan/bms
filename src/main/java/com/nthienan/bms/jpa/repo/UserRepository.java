package com.nthienan.bms.jpa.repo;

import com.nthienan.bms.jpa.entity.User;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Service;

/**
 * Created on 10/06/2016.
 *
 * @author nthienan
 */
@Service
public interface UserRepository extends PagingAndSortingRepository<User, Long>, JpaSpecificationExecutor<User> {

    /**
     * @param username an username
     * @return user if exits, otherwise null
     */
    @Nullable
    User findByUsername(@NotNull String username);
}
