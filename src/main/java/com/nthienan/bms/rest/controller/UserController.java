package com.nthienan.bms.rest.controller;

import com.nthienan.bms.exception.ResourceNotFoundException;
import com.nthienan.bms.jpa.entity.User;
import com.nthienan.bms.rest.assembler.ApplianceResourceAssembler;
import com.nthienan.bms.rest.assembler.UserResourceAssembler;
import com.nthienan.bms.rest.resource.ApplianceResource;
import com.nthienan.bms.rest.resource.UserResource;
import com.nthienan.bms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

import static com.nthienan.bms.rest.controller.ControllerHelper.buildSpec;

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

    @Autowired
    private UserResourceAssembler userAssembler;

    @Autowired
    private ApplianceResourceAssembler applianceAssembler;

    @RequestMapping(value = "/{userId:[\\d]+}", method = RequestMethod.GET)
    public ResponseEntity<UserResource> getById(@PathVariable Long userId) {
        User user = userService.getById(userId);
        if (user == null) {
            throw new ResourceNotFoundException("User " + userId + " was not found.");
        }
        return ResponseEntity.ok(userAssembler.toResource(user));
    }

    @RequestMapping(value = "/{userId:[\\d]+}/appliances", method = RequestMethod.GET)
    public ResponseEntity<List<ApplianceResource>> getApplianceByUserId(@PathVariable Long userId) {
        User user = userService.getById(userId);
        if (user == null) {
            throw new ResourceNotFoundException("User " + userId + " was not found.");
        }
        return ResponseEntity.ok(applianceAssembler.toResources(user.getAppliances()));
    }

    @RequestMapping(value = "/search", method = RequestMethod.GET)
    public ResponseEntity<List<UserResource>> search(@RequestParam(required = false) String query) {
        Specification<User> specification = buildSpec(query);
        List<User> userList = null;
        if (specification != null) {
            userList = userService.search(specification);
        }
        if (userList == null) {
            userList = new ArrayList<>();
        }
        return ResponseEntity.ok(userAssembler.toResources(userList));
    }

    @RequestMapping(value = "/authenticated", method = RequestMethod.GET)
    public ResponseEntity<?> getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return ResponseEntity.ok(authentication.getPrincipal());
    }
}
