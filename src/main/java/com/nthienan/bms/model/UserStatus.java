package com.nthienan.bms.model;

/**
 * Created on 10/06/2016.
 *
 * @author nthienan
 */
public enum UserStatus {
    /**
     * User is disabled
     */
    LOCKED(false),

    /**
     * User is enabled
     */
    ACTIVED(true);

    private boolean isEnabled = true;

    UserStatus(boolean isEnabled) {
        this.isEnabled = isEnabled;
    }

    /**
     * Get value of status's user
     *
     * @return true if status is ACTIVED. false otherwise
     */
    public boolean getValue() {
        return isEnabled;
    }

    @Override
    public String toString() {
        return String.valueOf(isEnabled);
    }
}
