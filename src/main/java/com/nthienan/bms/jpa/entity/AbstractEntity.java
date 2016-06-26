package com.nthienan.bms.jpa.entity;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

/**
 * Created on 10/06/2016.
 *
 * @author nthienan
 */
@MappedSuperclass
public abstract class AbstractEntity<PK> implements BasicEntity<PK> {

    @Id
    @GeneratedValue
    @Column
    private PK id;

    @Override
    public PK getId(){
        return id;
    }
}
