package com.nthienan.bms.jpa.repo;

import com.nthienan.bms.jpa.entity.AbstractSecuredEntity;
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
 * Created on 7/13/2016.
 *
 * @author nthienan
 */
@Repository
public class AclRepository {

    private static Logger logger = Logger.getLogger(AclRepository.class);

    @Autowired
    private MutableAclService mutableAclService;

    @Transactional
    public void addPermission(AbstractSecuredEntity element, Sid recipient, Permission permission) {
        MutableAcl acl;
        ObjectIdentity oid = new ObjectIdentityImpl(element);
        try {
            acl = (MutableAcl) mutableAclService.readAclById(oid);
        } catch (NotFoundException nfe) {
            logger.debug(nfe);
            acl = mutableAclService.createAcl(oid);
        }

        acl.insertAce(acl.getEntries().size(), permission, recipient, true);
        mutableAclService.updateAcl(acl);

        logger.debug("Added permission " + permission + " for Sid " + recipient + " contact " + element);
    }

    @Transactional
    public boolean addAccessControlEntry(AbstractSecuredEntity element, Sid recipient, Permission permission) {
        Assert.notNull(element, "Permissionable required");
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
    public boolean doesAceExists(AbstractSecuredEntity element, Sid recipient, Permission permission) {
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

    @Transactional
    public void deletePermission(AbstractSecuredEntity element) {
        // Delete the ACL information as well
        ObjectIdentity oid = new ObjectIdentityImpl(element);
        mutableAclService.deleteAcl(oid, false);
    }

    @Transactional
    public boolean deleteAccessControlEntry(AbstractSecuredEntity element, Sid recipient, Permission permission) {
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
