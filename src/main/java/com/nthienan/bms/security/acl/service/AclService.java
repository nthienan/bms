package com.nthienan.bms.security.acl.service;

import com.nthienan.bms.security.acl.entity.Permissionable;

/**
 * Created on 7/24/2016.
 *
 * @author nthienan
 */
public interface AclService {

    void grantAllPermissions(Permissionable entity);
}
