'use strict';

class Filter {
    constructor(make, model, priceLimit, ConstructionYearFrom, fuel, gearBox, form) {
        
        this.make = make;
        this.model = model;
        this.priceLimit = priceLimit;
        this.ConstructionYearFrom = ConstructionYearFrom;
        this.fuel = fuel;
        this.gearBox = gearBox;
        this.form = form;
    }
}



module.exports = Filter;
