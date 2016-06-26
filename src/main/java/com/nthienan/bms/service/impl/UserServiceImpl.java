package com.nthienan.bms.service.impl;

import com.nthienan.bms.jpa.entity.User;
import com.nthienan.bms.jpa.repo.UserRepository;
import com.nthienan.bms.service.UserService;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created on 10/06/2016.
 *
 * @author nthienan
 */
@Service
public class UserServiceImpl implements UserService, UserDetailsService {

    @Autowired
    UserRepository userRepo;

    @Autowired
    PasswordEncoder passwordEncoder;


    @Override
    @Nullable
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepo.findByUsername(username);
    }

    @Override
    public User create(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    @Override
    @Nullable
    public User getById(@NotNull Long userId) {
        return userRepo.findOne(userId);
    }

    @Override
    @Nullable
    public List<User> search(@NotNull Specification<User> specification) {
        return userRepo.findAll(specification);
    }
}
