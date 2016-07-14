package com.nthienan.bms.util;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

public class SecurityUtil {

	private SecurityUtil(){}

	public static String getUsername() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth.getPrincipal() instanceof UserDetails) {
            return ((UserDetails) auth.getPrincipal()).getUsername();
        } else {
            return auth.getPrincipal().toString();
        }
    }

	public static Collection<? extends GrantedAuthority> getUserRoles() {
		Authentication auth = SecurityContextHolder.getContext()
				.getAuthentication();
		return auth.getAuthorities();
	}
}
