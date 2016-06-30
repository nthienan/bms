package com.nthienan.bms.jpa.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import java.util.Set;

/**
 * Created on 10/06/2016.
 *
 * @author nthienan
 */
@Entity
@Table(name = "groups")
public class Group extends AbstractEntity<Long> {

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "user_groups", joinColumns = {
            @JoinColumn(name = "groups_id", nullable = false)}, inverseJoinColumns = {
            @JoinColumn(name = "user_id", nullable = false)
    })
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    Set<User> users;

    @Column(name = "group_name", nullable = false, unique = true)
    private String groupName;

    @Column(name = "descriptsion")
    private String descriptsion;

    public Group() {
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public String getDescriptsion() {
        return descriptsion;
    }

    public void setDescriptsion(String descriptsion) {
        this.descriptsion = descriptsion;
    }

    public void addUser(User user) {
        this.users.add(user);
    }

    public void removeUser(User user) {
        this.users.remove(user);
    }
}
