package com.nthienan.bms.appliance.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.nthienan.bms.security.acl.entity.AbstractSecuredEntity;
import com.nthienan.bms.user.model.User;

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
@JsonIgnoreProperties(ignoreUnknown = true)
public class Appliance extends AbstractSecuredEntity<Long> {

    @Column(nullable = false, unique = true)
    private String hostname;

    @Column(name = "ipv4_address", nullable = false, unique = true)
    private String ipv4Address;

    @Column(length = 500)
    private String note;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "appliance_user",
            joinColumns = {
                    @JoinColumn(name = "appliance_id", nullable = false)},
            inverseJoinColumns = {
                    @JoinColumn(name = "user_id", nullable = false)})
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private List<User> owners;

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

    @Override
    public Iterable<User> getOwners() {
        return owners;
    }

    public void setOwners(List<User> owners) {
        this.owners = owners;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
