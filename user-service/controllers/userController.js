const User = require('../models/userModel');

let users = [];
let userIdCounter = 1;

const createUser = (req, res) => {
  const { name, email } = req.body;
  const newUser = new User(userIdCounter++, name, email);
  users.push(newUser);
  res.status(201).json(newUser);
};

const getUserById = (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.userId));
  if (!user) return res.status(404).send('User not found.');
  res.json(user);
};

const updateUser = (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.userId));
  if (!user) return res.status(404).send('User not found.');

  user.activeBookings = req.body.activeBookings;
  res.json(user);
};

module.exports = { createUser, getUserById, updateUser };