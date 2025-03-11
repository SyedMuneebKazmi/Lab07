const express = require('express');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
app.use(express.json()); 
app.use('/bookings', bookingRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Booking Service listening on port ${PORT}`);
});