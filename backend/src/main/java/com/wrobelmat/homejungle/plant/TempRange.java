package com.wrobelmat.homejungle.plant;

import javax.persistence.Embeddable;

@Embeddable
public class TempRange {

    int minTemp;
    int maxTemp;

    public TempRange(){}

    public TempRange(int minTemp, int maxTemp) {
        this.minTemp = minTemp;
        this.maxTemp = maxTemp;
    }

    public int getMinTemp() {
        return minTemp;
    }

    public void setMinTemp(int minTemp) {
        this.minTemp = minTemp;
    }

    public int getMaxTemp() {
        return maxTemp;
    }

    public void setMaxTemp(int maxTemp) {
        this.maxTemp = maxTemp;
    }
}
