
const express = require('express');
const carRoutes = require('./routes/carRoutes');

const app = express();
app.use(express.json());
app.use('/cars', carRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Car Service listening on port ${PORT}`);
});