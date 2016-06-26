package com.nthienan.bms.rest.assembler;

import com.nthienan.bms.jpa.entity.Appliance;
import com.nthienan.bms.rest.controller.ApplianceController;
import com.nthienan.bms.rest.resource.ApplianceResource;
import org.springframework.hateoas.mvc.ControllerLinkBuilder;
import org.springframework.hateoas.mvc.ResourceAssemblerSupport;
import org.springframework.stereotype.Service;

/**
 * Created on 21/06/2016.
 *
 * @author nthienan
 */
@Service
public class ApplianceResourceAssembler extends ResourceAssemblerSupport<Appliance, ApplianceResource> {

    public ApplianceResourceAssembler() {
        super(ApplianceController.class, ApplianceResource.class);
    }

    @Override
    public ApplianceResource toResource(Appliance appliance) {
        ApplianceResource applianceResource = createResourceWithId(appliance.getId(), appliance);
        applianceResource.setAppliance(appliance);
        addOwnersLink(applianceResource, appliance);
        return applianceResource;
    }

    private void addOwnersLink(ApplianceResource resource, Appliance appliance) {
        resource.add(ControllerLinkBuilder.linkTo(ControllerLinkBuilder.methodOn(ApplianceController.class).getByOwnersByApplianceId(appliance.getId())).withRel("owners"));
    }
}
