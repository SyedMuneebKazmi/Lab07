class Booking {
    constructor(id, userId, carId, startDate, endDate, status = 'active') {
        this.id = id;
        this.userId = userId;
        this.carId = carId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
    }
}

module.exports = Booking;