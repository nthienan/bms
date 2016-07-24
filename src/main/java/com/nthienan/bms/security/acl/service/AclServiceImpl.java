package com.nthienan.bms.security.acl.service;

import com.nthienan.bms.security.acl.entity.Permissionable;
import com.nthienan.bms.security.acl.repo.AclRepository;
import com.nthienan.bms.util.SecurityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.acls.domain.BasePermission;
import org.springframework.security.acls.domain.PrincipalSid;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created on 7/24/2016.
 *
 * @author nthienan
 */
@Service
@Transactional
public class AclServiceImpl implements AclService {

    @Autowired
    private AclRepository aclRepo;

    @Override
    public void grantAllPermissions(Permissionable entity) {
        PrincipalSid sid = new PrincipalSid(SecurityUtil.getUsername());
        aclRepo.addAce(entity, sid, BasePermission.READ);
        aclRepo.addAce(entity, sid, BasePermission.WRITE);
        aclRepo.addAce(entity, sid, BasePermission.DELETE);
        aclRepo.addAce(entity, sid, BasePermission.ADMINISTRATION);
    }
}
