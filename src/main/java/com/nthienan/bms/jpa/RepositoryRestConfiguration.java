package com.nthienan.bms.jpa;

import com.nthienan.bms.appliance.model.Appliance;
import com.nthienan.bms.user.model.User;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

@Configuration
public class RepositoryRestConfiguration extends RepositoryRestConfigurerAdapter {

    @Override
    public void configureRepositoryRestConfiguration(org.springframework.data.rest.core.config.RepositoryRestConfiguration config) {
        config.exposeIdsFor(Appliance.class, User.class);
    }
}
