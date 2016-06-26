package com.nthienan.bms.jpa.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import java.util.List;

/**
 * @author nthienan
 *         Created on 10/06/2016.
 */
@Entity
@Table(name = "appliances")
public class Appliance extends AbstractEntity<Long> {

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false, unique = true)
    private String hostname;

    @Column(name = "ipv4_address", nullable = false, unique = true)
    private String ipv4Address;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "appliance_user",
            joinColumns = {
                    @JoinColumn(name = "appliance_id", nullable = false)},
            inverseJoinColumns = {
                    @JoinColumn(name = "user_id", nullable = false)})
    private List<User> owners;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getHostname() {
        return hostname;
    }

    public void setHostname(String hostname) {
        this.hostname = hostname;
    }

    public String getIpv4Address() {
        return ipv4Address;
    }

    public void setIpv4Address(String ipv4Address) {
        this.ipv4Address = ipv4Address;
    }

    public Iterable<User> getOwners() {
        return owners;
    }

    public void setOwners(List<User> owners) {
        this.owners = owners;
    }
}
