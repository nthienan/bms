package com.nthienan.bms.appliance.repo;

import com.nthienan.bms.appliance.model.Appliance;
import com.nthienan.bms.security.acl.service.AclService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleAfterCreate;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.stereotype.Component;

/**
 * Created on 7/24/2016.
 *
 * @author nthienan
 */
@Component
@RepositoryEventHandler(Appliance.class)
public class ApplianceEventHandler {

    @Autowired
    private AclService aclService;

    @HandleAfterCreate
    public void onAfterCreate(Appliance appliance){
        aclService.grantAllPermissions(appliance);
    }
}
