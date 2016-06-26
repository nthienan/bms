package com.nthienan.bms.hibernate.usertype;

import com.nthienan.bms.jpa.entity.Authority;
import com.nthienan.bms.jpa.entity.Role;
import org.hibernate.engine.spi.SessionImplementor;
import org.hibernate.usertype.UserType;

import java.io.Serializable;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

/**
 * Created on 10/06/2016.
 *
 * @author nthienan
 */
public class AuthorityUserType implements UserType {

    private static final int[] SQL_TYPES = {Types.INTEGER};

    @Override
    public int[] sqlTypes() {
        return SQL_TYPES;
    }

    @Override
    public Class<?> returnedClass() {
        return Set.class;
    }

    @Override
    public boolean equals(Object x, Object y) {
        if (x == y) {
            return true;
        }
        return null == x || null == y ? false : x.equals(y);
    }

    @Override
    public int hashCode(Object x) {
        return x.hashCode();
    }

    @Override
    public Object nullSafeGet(ResultSet resultSet, String[] names, SessionImplementor session, Object owner)
            throws SQLException {

        int authoritiesNumber = resultSet.getInt(names[0]);
        if (!resultSet.wasNull()) {
            return convertToObject(authoritiesNumber);
        } else {
            return null;
        }
    }

    /**
     * Convert role number to Set of {@link Authority}
     *
     * @param authoritiesNumber authorities number get from database
     * @return
     */
    private Set<Authority> convertToObject(int authoritiesNumber) {
        Set<Authority> result = new HashSet<>();
        Set<Role> allRoles = Role.getAllRoles();
        for (Role role : allRoles) {
            int level = role.getLevel();
            if ((level & authoritiesNumber) == level) {
                result.add(new Authority(role));
            }
        }
        return result;
    }

    @Override
    public void nullSafeSet(PreparedStatement preparedStatement, Object value, int index, SessionImplementor session)
            throws SQLException {
        if (value == null) {
            preparedStatement.setNull(index, Types.INTEGER);
        } else {
            if (value instanceof Collection<?>) {
                Set<Authority> strValue = (HashSet<Authority>) value;
                preparedStatement.setInt(index, convertToInteger(strValue));
            }
        }
    }

    private int convertToInteger(Set<? extends Authority> authorities) {
        int result = 0;
        if (authorities != null) {
            for (Authority authority : authorities) {
                if (authority != null) {
                    result = result | authority.getRole().getLevel();
                }
            }
        }
        return result;
    }

    @Override
    public Object deepCopy(Object value) {
        return value;
    }

    @Override
    public boolean isMutable() {
        return true;
    }

    @Override
    public Serializable disassemble(Object value) {
        return value.toString();
    }

    @Override
    public Object assemble(Serializable cached, Object owner) {
        return deepCopy(cached);
    }

    @Override
    public Object replace(Object original, Object target, Object owner) {
        return deepCopy(original);
    }
}
