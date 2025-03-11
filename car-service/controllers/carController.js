
const express = require('express');
const Car = require('../models/carModel');

let cars = [];
let carIdCounter = 1;

const createCar = (req, res) => {
  const { model, location } = req.body;
  const newCar = new Car(carIdCounter++, model, location);
  cars.push(newCar);
  res.status(201).json(newCar);
};

const getCarById = (req, res) => {
  const car = cars.find(c => c.id === parseInt(req.params.carId));
  if (!car) return res.status(404).send('Car not found.');
  res.json(car);
};

const updateCarAvailability = (req, res) => {
  const car = cars.find(c => c.id === parseInt(req.params.carId));
  if (!car) return res.status(404).send('Car not found.');

  car.isAvailable = req.body.isAvailable;
  res.json(car);
};

module.exports = { createCar, getCarById, updateCarAvailability };