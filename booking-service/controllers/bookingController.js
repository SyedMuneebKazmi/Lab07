const Booking = require('../models/bookingModel');
const axios = require('axios');

let bookings = [];
let bookingIdCounter = 1;

const createBooking = async (req, res) => {
    const { userId, carId, startDate, endDate } = req.body;

    try {
                const userResponse = await axios.get(`http://localhost:3001/users/${userId}`);
        if (userResponse.data.activeBookings >= userResponse.data.maxBookings) {
            return res.status(400).json({ message: 'User has reached booking limit.' });
        }
        const carResponse = await axios.get(`http://localhost:3002/cars/${carId}`);
        if (!carResponse.data.isAvailable) {
            return res.status(400).json({ message: 'Car is not available.' });
        }

        const newBooking = new Booking(bookingIdCounter++, userId, carId, startDate, endDate);
        bookings.push(newBooking);

        
        await axios.put(`http://localhost:3001/users/${userId}`, {
            activeBookings: userResponse.data.activeBookings + 1,
        });

        
        await axios.put(`http://localhost:3002/cars/${carId}`, { isAvailable: true });

        res.status(201).json(newBooking);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating booking.' });
    }
};

const getUserBookings = (req, res) => {
    const userBookings = bookings.filter(b => b.userId === parseInt(req.params.userId));
    res.json(userBookings);
};

const cancelBooking = async (req, res) => {
    const bookingId = parseInt(req.params.bookingId);
    const bookingIndex = bookings.findIndex(b => b.id === bookingId);
    if (bookingIndex === -1) {
        return res.status(404).json({ message: 'Booking not found.' });
    }

    const { userId, carId } = bookings[bookingIndex];

    bookings.splice(bookingIndex, 1);

    
    const userResponse = await axios.get(`http://localhost:3001/users/${userId}`);
    await axios.put(`http://localhost:3001/users/${userId}`, {
        activeBookings: userResponse.data.activeBookings - 1,
    });

    
    await axios.put(`http://localhost:3002/cars/${carId}`, { isAvailable: true });

    res.json({ message: 'Booking canceled.' });
};

module.exports = { createBooking, getUserBookings, cancelBooking };