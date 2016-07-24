package com.nthienan.bms.user.model;

import org.springframework.security.core.GrantedAuthority;

/**
 * Created on 10/06/2016.
 *
 * @author nthienan
 */
public class Authority implements GrantedAuthority {

    private Role role;

    public Authority() {
    }

    public Authority(Role role) {
        this.role = role;
    }

    @Override
    public String getAuthority() {
        return role.getName();
    }

    public Role getRole() {
        return role;
    }

    @Override
    public String toString() {
        return getAuthority();
    }

    @Override
    public int hashCode() {
        int result = 17;
        result = 31 * result + role.hashCode();
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == this) {
            return true;
        }
        if (!(obj instanceof Authority)) {
            return false;
        }
        Authority instance = (Authority) obj;
        return this.role.equals(instance.getRole());
    }

}