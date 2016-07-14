package com.nthienan.bms.jpa.repo;

import com.nthienan.bms.jpa.entity.AbstractSecuredEntity;
import org.springframework.security.acls.model.Permission;
import org.springframework.security.acls.model.Sid;

/**
 * Created on 7/13/2016.
 *
 * @author nthienan
 */
public interface AclRepository {

    void addPermission(AbstractSecuredEntity element, Sid recipient, Permission permission);

    void addPermission(AbstractSecuredEntity element, Sid recipient, Permission permission, boolean granting);

    boolean addAccessControlEntry(AbstractSecuredEntity element, Sid recipient, Permission permission);

    boolean addAccessControlEntry(AbstractSecuredEntity element, Sid recipient, Permission permission, boolean granting);

    /**
     * Check if ACE - Access Control Entry exists already
     */
    boolean doesAceExists(AbstractSecuredEntity element, Sid recipient, Permission permission);

    void deletePermission(AbstractSecuredEntity element);

    boolean deleteAccessControlEntry(AbstractSecuredEntity element, Sid recipient, Permission permission);
}
