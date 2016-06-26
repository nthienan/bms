package com.nthienan.bms.jpa.entity;

import java.util.EnumSet;

/**
 * Created on 10/06/2016.
 *
 * @author nthienan
 */
public enum Role {
    ANONYMOUS("ROLE_ANONYMOUS", 1),
    USER("ROLE_USER", 2),
    SUPER_USER("ROLE_SUPER_USER", 4),
    ADMIN("ROLE_ADMIN", 512),
    ROOT("ROLE_ROOT", 1024);

    private String name;
    private int level;

    Role(String name, int level) {
        this.name = name;
        this.level = level;
    }

    /**
     * @return the level
     */
    public int getLevel() {
        return level;
    }

    /**
     * @return the name
     */
    public String getName() {
        return name;
    }

    public static EnumSet<Role> getAllRoles() {
        return EnumSet.range(ANONYMOUS, ROOT);
    }

    public boolean greaterThan(Role role) {
        if (role == null)
            return true;
        return (this.level > role.getLevel());
    }

    public boolean greaterThanOrEqual(Role role) {
        if (role == null)
            return true;
        return (this.level >= role.getLevel());
    }

    public boolean lessThan(Role role) {
        if (role == null)
            return false;
        return (this.level < role.getLevel());
    }

    public boolean lessThanOrEqual(Role role) {
        if (role == null)
            return false;
        return (this.level <= role.getLevel());
    }

    @Override
    public String toString() {
        return name;
    }
}
