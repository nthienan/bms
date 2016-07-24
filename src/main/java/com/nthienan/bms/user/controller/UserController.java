package com.nthienan.bms.user.controller;

import com.nthienan.bms.user.model.User;
import com.nthienan.bms.user.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.webmvc.BasePathAwareController;
import org.springframework.data.rest.webmvc.PersistentEntityResourceAssembler;
import org.springframework.data.rest.webmvc.RepositorySearchesResource;
import org.springframework.hateoas.EntityLinks;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.LinkBuilder;
import org.springframework.hateoas.ResourceProcessor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static com.nthienan.bms.util.ControllerHelper.buildSpec;

/**
 * Created on 7/23/2016.
 *
 * @author nthienan
 */
@RestController
@RepositoryRestResource
@BasePathAwareController
@RequestMapping("/users/search")
public class UserController implements ResourceProcessor<RepositorySearchesResource> {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private EntityLinks entityLinks;

    @RequestMapping(value = "/authenticated", method = RequestMethod.GET)
    public ResponseEntity<?> getAuthenticatedUser(Authentication authentication, PersistentEntityResourceAssembler assembler) {
        String username = authentication.getName();
        User user = userRepo.findByUsername(username);
        return ResponseEntity.ok(assembler.toFullResource(user));
    }

    @RequestMapping(value = "/findAll", method = RequestMethod.GET)
    public ResponseEntity<?> findAll(@RequestParam(required = false) String query, PersistentEntityResourceAssembler assembler) {
        Specification<User> specification = buildSpec(query);
        Iterable<User> userList;
        if (specification != null) {
            userList = userRepo.findAll(specification);
        } else {
            userList = userRepo.findAll();
        }
        // TODO: Need to investigate to convert userList to PersistentEntityResource. Currently, we have stackoverflow issue with this.
        return ResponseEntity.ok(userList);
    }

    @Override
    public RepositorySearchesResource process(RepositorySearchesResource resource) {
        LinkBuilder lb = entityLinks.linkFor(User.class, "name");
        resource.add(new Link(lb.toString() + "/search/findAll{?query}", "findAll"));
        resource.add(new Link(lb.toString() + "/search/authenticated", "authenticated"));
        return resource;
    }
}
