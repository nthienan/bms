package com.nthienan.bms.security.acl.entity;

import com.nthienan.bms.jpa.entity.AbstractEntity;

/**
 * Created on 7/13/2016.
 *
 * @author nthienan
 */
public abstract class AbstractSecuredEntity<PK> extends AbstractEntity<PK> implements Permissionable<PK> {
}
