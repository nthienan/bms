package com.nthienan.bms.user.model;

import org.jetbrains.annotations.Contract;
import org.jetbrains.annotations.NotNull;

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

    @NotNull
    public static EnumSet<Role> getAllRoles() {
        return EnumSet.range(ANONYMOUS, ROOT);
    }

    @NotNull
    public static String getRoleHierarchy() {
        StringBuilder sb = new StringBuilder();
        sb.append(ROOT).append(" > ");
        sb.append(ADMIN).append(" > ");
        sb.append(SUPER_USER).append(" > ");
        sb.append(USER).append(" > ");
        sb.append(ANONYMOUS);
        return sb.toString();
    }

    @Contract("null -> true")
    public boolean greaterThan(Role role) {
        if (role == null)
            return true;
        return this.level > role.getLevel();
    }

    @Contract("null -> true")
    public boolean greaterThanOrEqual(Role role) {
        if (role == null)
            return true;
        return this.level >= role.getLevel();
    }

    @Contract("null -> false")
    public boolean lessThan(Role role) {
        if (role == null)
            return false;
        return this.level < role.getLevel();
    }

    @Contract("null -> false")
    public boolean lessThanOrEqual(Role role) {
        if (role == null)
            return false;
        return this.level <= role.getLevel();
    }

    @Override
    public String toString() {
        return name;
    }
}
