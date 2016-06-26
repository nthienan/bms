package com.nthienan.bms.jpa.entity;

import java.io.Serializable;

/**
 * @author nthienan
 *         Created on 10/06/2016.
 */
public interface BasicEntity<PK> extends Serializable {

    /**
     * Get id of entity
     *
     * @return id of entity
     */
    PK getId();

}
