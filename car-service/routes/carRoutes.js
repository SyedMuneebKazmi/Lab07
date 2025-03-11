const express = require('express');
const { createCar, getCarById, updateCarAvailability } = require('../controllers/carController');
const router = express.Router();

router.post('/', createCar);
router.get('/:carId', getCarById);
router.put('/:carId', updateCarAvailability);

module.exports = router;