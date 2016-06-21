package com.nthienan.bms.rest.assembler;

import com.nthienan.bms.model.Appliance;
import com.nthienan.bms.rest.controller.ApplianceController;
import com.nthienan.bms.rest.resource.ApplianceResource;
import org.springframework.hateoas.mvc.ResourceAssemblerSupport;
import org.springframework.stereotype.Component;

/**
 * Created on 21/06/2016.
 *
 * @author nthienan
 */
@Component
public class ApplianceResourceAssembler extends ResourceAssemblerSupport<Appliance, ApplianceResource> {

    public ApplianceResourceAssembler() {
        super(ApplianceController.class, ApplianceResource.class);
    }

    @Override
    public ApplianceResource toResource(Appliance appliance) {
        ApplianceResource applianceResource = createResourceWithId(appliance.getId(), appliance);
        applianceResource.setAppliance(appliance);
        return applianceResource;
    }
}
