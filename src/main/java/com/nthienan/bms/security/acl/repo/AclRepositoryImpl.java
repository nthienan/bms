package com.nthienan.bms.security.acl.repo;

import com.nthienan.bms.security.acl.entity.Permissionable;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.acls.domain.ObjectIdentityImpl;
import org.springframework.security.acls.model.AccessControlEntry;
import org.springframework.security.acls.model.MutableAcl;
import org.springframework.security.acls.model.MutableAclService;
import org.springframework.security.acls.model.NotFoundException;
import org.springframework.security.acls.model.ObjectIdentity;
import org.springframework.security.acls.model.Permission;
import org.springframework.security.acls.model.Sid;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import java.util.List;

/**
 * Created on 7/14/2016.
 *
 * @author nthienan
 */
@Repository
public class AclRepositoryImpl implements AclRepository {

    private static Logger logger = Logger.getLogger(AclRepository.class);

    @Autowired
    private MutableAclService mutableAclService;

    @Override
    @Transactional
    public boolean addAce(Permissionable element, Sid recipient, Permission permission) {
        return addAce(element, recipient, permission, true);
    }

    @Override
    @Transactional
    public boolean addAce(Permissionable element, Sid recipient, Permission permission, boolean granting) {
        Assert.notNull(element, "AbstractSecuredEntity required");
        Assert.notNull(recipient, "Sid required");
        Assert.notNull(permission, "Permission required");

        MutableAcl acl;
        ObjectIdentity oid = new ObjectIdentityImpl(element);
        try {
            acl = (MutableAcl) mutableAclService.readAclById(oid);
        } catch (NotFoundException nfe) {
            logger.debug(nfe);
            acl = mutableAclService.createAcl(oid);
        }

        /*
         * handle duplicate ACL entries
         * http://forum.springsource.org/showthread.php?73022-Should-AclImpl-allow-duplicate-permissions
         */
        if (doesAceExists(element, recipient, permission)) {
            logger.debug("ACE already exists, element: " + element.getId() + ", Sid: " + recipient + ", permission: " + permission);
        } else {
            acl.insertAce(acl.getEntries().size(), permission, recipient, true);
            mutableAclService.updateAcl(acl);
            logger.debug("Added permission " + permission + " for Sid " + recipient + " contact " + element);
        }
        return true;
    }

    /**
     * Check if ACE - Access Control Entry exists already
     */
    @Override
    public boolean doesAceExists(Permissionable element, Sid recipient, Permission permission) {
        ObjectIdentity oid = new ObjectIdentityImpl(element);
        MutableAcl acl;
        try {
            acl = (MutableAcl) mutableAclService.readAclById(oid);
        } catch (NotFoundException nfe) {
            logger.debug(nfe);
            acl = mutableAclService.createAcl(oid);
        }

        List<AccessControlEntry> entries = acl.getEntries();
        for (AccessControlEntry ace : entries) {
            if (ace.getSid().equals(recipient) && ace.getPermission().equals(permission)) {
                return true;
            }
        }
        return false;
    }

    @Override
    @Transactional
    public void deleteAllPermission(Permissionable element) {
        // Delete the ACL information as well
        ObjectIdentity oid = new ObjectIdentityImpl(element);
        mutableAclService.deleteAcl(oid, false);
    }

    @Override
    @Transactional
    public boolean deleteAccessControlEntry(Permissionable element, Sid recipient, Permission permission) {
        ObjectIdentity oid = new ObjectIdentityImpl(element);
        MutableAcl acl;
        try {
            acl = (MutableAcl) mutableAclService.readAclById(oid);
        } catch (NotFoundException nfe) {
            logger.debug(nfe);
            acl = mutableAclService.createAcl(oid);
        }

        List<AccessControlEntry> entries = acl.getEntries();
        for (int i = 0; i < entries.size(); i++) {
            if (entries.get(i).getSid().equals(recipient) && entries.get(i).getPermission().equals(permission)) {
                acl.deleteAce(i);
            }
        }

        mutableAclService.updateAcl(acl);

        if (logger.isDebugEnabled()) {
            logger.debug("Deleted Permission: " + permission + " for recipient: " + recipient + " on object: " + element);
        }

        return true;
    }
}
