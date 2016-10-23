package com.nthienan.bms.user.repo;

import com.nthienan.bms.user.model.User;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created on 10/06/2016.
 *
 * @author nthienan
 */
@Transactional
@RestResource(path = "users")
public interface UserRepository extends PagingAndSortingRepository<User, Long>, JpaSpecificationExecutor<User> {

    /**
     * @param username an username
     * @return user if exits, otherwise null
     */
    @Nullable
    User findByUsername(@NotNull @Param("username") String username);

}
