package com.nthienan.bms.rest.assembler;

import com.nthienan.bms.jpa.entity.User;
import com.nthienan.bms.rest.controller.UserController;
import com.nthienan.bms.rest.resource.UserResource;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.mvc.ControllerLinkBuilder;
import org.springframework.hateoas.mvc.ResourceAssemblerSupport;
import org.springframework.stereotype.Service;

/**
 * Created on 6/25/2016.
 *
 * @author nthienan
 */
@Service
public class UserResourceAssembler extends ResourceAssemblerSupport<User, UserResource> {

    public UserResourceAssembler() {
        super(UserController.class, UserResource.class);
    }

    @Override
    public UserResource toResource(User user) {
        UserResource resource = createResourceWithId(user.getId(), user);
        resource.setUser(user);
        resource.add(appliancesLink(user));
        return resource;
    }

    private Link appliancesLink(User user) {
        return ControllerLinkBuilder.linkTo(ControllerLinkBuilder.methodOn(UserController.class).getApplianceByUserId(user.getId())).withRel("appliances");
    }
}
