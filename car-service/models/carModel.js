class Car {
    constructor(id, model, location, isAvailable = true) {
      this.id = id;
      this.model = model;
      this.location = location;
      this.isAvailable = isAvailable;
    }
  }
  
  module.exports = Car;