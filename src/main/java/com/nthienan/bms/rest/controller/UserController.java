package com.nthienan.bms.rest.controller;

import com.nthienan.bms.model.Authority;
import com.nthienan.bms.model.Role;
import com.nthienan.bms.model.User;
import com.nthienan.bms.service.UserService;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashSet;
import java.util.Set;

/**
 * Created on 10/06/2016.
 *
 * @author nthienan
 */
@RestController
@Transactional
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;
}
