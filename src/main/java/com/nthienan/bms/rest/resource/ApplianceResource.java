package com.nthienan.bms.rest.resource;

import com.fasterxml.jackson.annotation.JsonUnwrapped;
import com.nthienan.bms.model.Appliance;
import org.springframework.hateoas.ResourceSupport;

/**
 * Created on 15/06/2016.
 *
 * @author nthienan
 */
public class ApplianceResource extends ResourceSupport {

    @JsonUnwrapped
    private Appliance appliance;

    public Appliance getAppliance() {
        return appliance;
    }

    public void setAppliance(Appliance appliance) {
        this.appliance = appliance;
    }

}
