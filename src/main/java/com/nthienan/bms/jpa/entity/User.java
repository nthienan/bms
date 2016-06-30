package com.nthienan.bms.jpa.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.annotations.Type;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created on 10/06/2016.
 *
 * @author nthienan
 */
@Entity
@Table(name = "users")
public class User extends AbstractEntity<Long> implements UserDetails {

    @Column(unique = true, nullable = false, length = 50)
    private String username;

    @JsonIgnore
    @Column(nullable = false)
    private String password;

    @Column(name = "first_name", length = 50)
    private String firstName;

    @Column(name = "last_name", length = 50)
    private String lastName;

    @Column(unique = true, nullable = false)
    private String email;

    private String image;

    @Column(name = "created_date")
    private Date createdDate = new Date();

    @Column(name = "last_login")
    private Date lastLogin;

    @Column(nullable = false)
    private UserStatus status = UserStatus.LOCKED;

    @Column(name = "built_in")
    private boolean builtIn;

    @Column(name = "expire_date")
    private Date expireDate;

    @Enumerated
    @Column(name = "gender")
    private Gender gender = Gender.MALE;

    @Type(type = "com.nthienan.bms.hibernate.usertype.AuthorityUserType")
    private Set<Authority> authorities;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "users")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private List<Group> groups;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "owners", cascade = CascadeType.ALL)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private List<Appliance> appliances;

    public User() {
        authorities = new HashSet<>();
    }

    public User(String username, String email) {
        this.username = username;
        this.email = email;
        authorities = new HashSet<>();
    }

    public List<Group> getGroups() {
        return groups;
    }

    public void setGroups(List<Group> groups) {
        this.groups = groups;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Set<Authority> authorities) {
        this.authorities = authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public boolean isAccountNonExpired() {
        if (null == expireDate) {
            return true;
        }
        return new Date().before(expireDate);
    }

    @Override
    public boolean isAccountNonLocked() {
        return status.getValue();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        if (null == expireDate) {
            return true;
        }
        return new Date().before(expireDate);
    }

    @Override
    public boolean isEnabled() {
        return status.getValue();
    }

    /**
     * Check this user has role
     *
     * @param role
     * @return true if this user has role, false if not
     */
    public boolean hasRole(Role role) {
        return authorities.contains(new Authority(role));
    }

    public boolean isSupperUser() {
        return hasRole(Role.ROOT) || hasRole(Role.ADMIN);
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public Date getLastLogin() {
        return lastLogin;
    }

    public void setLastLogin(Date lastLogin) {
        this.lastLogin = lastLogin;
    }

    public UserStatus getStatus() {
        return status;
    }

    public void setStatus(UserStatus status) {
        this.status = status;
    }

    public boolean isBuiltIn() {
        return builtIn;
    }

    public void setBuiltIn(boolean builtIn) {
        this.builtIn = builtIn;
    }

    public Date getExpireDate() {
        return expireDate;
    }

    public void setExpireDate(Date expireDate) {
        this.expireDate = expireDate;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public void addAuthority(Role role) {
        authorities.add(new Authority(role));
    }

    public void addGroup(Group group) {
        this.groups.add(group);
    }

    public void removeGroup(Group group) {
        this.groups.remove(group);
    }

    public List<Appliance> getAppliances() {
        return appliances;
    }

    public void setAppliances(List<Appliance> appliances) {
        this.appliances = appliances;
    }
}
