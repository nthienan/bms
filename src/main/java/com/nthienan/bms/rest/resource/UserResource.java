package com.nthienan.bms.rest.resource;

import com.fasterxml.jackson.annotation.JsonUnwrapped;
import com.nthienan.bms.jpa.entity.User;
import org.springframework.hateoas.ResourceSupport;

/**
 * Created on 6/25/2016.
 *
 * @author nthienan
 */
public class UserResource extends ResourceSupport {

    @JsonUnwrapped
    private User user;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
