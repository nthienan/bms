package com.nthienan.bms.security.acl.entity;

import com.nthienan.bms.jpa.entity.BasicEntity;
import com.nthienan.bms.user.model.User;

/**
 * Created on 7/13/2016.
 *
 * @author nthienan
 */
public interface Permissionable<PK> extends BasicEntity<PK> {

    Iterable<User> getOwners();
}
