class User {
    constructor(id, name, email, maxBookings = 3, activeBookings = 0) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.maxBookings = maxBookings;
      this.activeBookings = activeBookings;
    }
  }
  
  module.exports = User;