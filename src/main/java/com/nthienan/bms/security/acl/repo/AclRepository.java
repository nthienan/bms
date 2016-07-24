package com.nthienan.bms.security.acl.repo;

import com.nthienan.bms.security.acl.entity.Permissionable;
import org.springframework.security.acls.model.Permission;
import org.springframework.security.acls.model.Sid;

/**
 * Created on 7/13/2016.
 *
 * @author nthienan
 */
public interface AclRepository {

    boolean addAce(Permissionable element, Sid recipient, Permission permission);

    boolean addAce(Permissionable element, Sid recipient, Permission permission, boolean granting);

    /**
     * Check if ACE - Access Control Entry exists already
     */
    boolean doesAceExists(Permissionable element, Sid recipient, Permission permission);

    void deleteAllPermission(Permissionable element);

    boolean deleteAccessControlEntry(Permissionable element, Sid recipient, Permission permission);
}
