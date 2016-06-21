package com.nthienan.bms.rest.controller;

import com.nthienan.bms.exception.ResourceNotFoundException;
import com.nthienan.bms.model.Appliance;
import com.nthienan.bms.rest.assembler.ApplianceResourceAssembler;
import com.nthienan.bms.rest.resource.ApplianceResource;
import com.nthienan.bms.service.ApplianceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedResources;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author nthienan
 *         Created on 08/06/2016.
 */
@RestController
@Transactional
@RequestMapping("/api/appliances")
public class ApplianceController {

    @Autowired
    ApplianceService applianceService;

    @Autowired
    ApplianceResourceAssembler assembler;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<PagedResources<Appliance>> getPage(@PageableDefault Pageable pageable,
                                                             PagedResourcesAssembler pagedAssembler) {
        Page<Appliance> appliancePage = applianceService.getPage(pageable);
        return ResponseEntity.ok(pagedAssembler.toResource(appliancePage, assembler));
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<ApplianceResource> create(@RequestBody Appliance appliance) {
        Appliance result = applianceService.create(appliance);
        return ResponseEntity.status(HttpStatus.CREATED).body(assembler.toResource(result));
    }

    @RequestMapping(value = "/{applianceId}", method = RequestMethod.GET)
    public ResponseEntity<ApplianceResource> getById(@PathVariable Long applianceId) {
        Appliance appliance = applianceService.getById(applianceId);
        if (appliance == null) {
            throw new ResourceNotFoundException("Appliance " + applianceId + " was not found.");
        }
        return ResponseEntity.ok(assembler.toResource(appliance));
    }
}
