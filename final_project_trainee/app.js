require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const doctorRoutes = require('./routes/doctorRoutes');
const specialtyRoutes = require('./routes/specialtyRoutes');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

app.use('/api/doctors', doctorRoutes);
app.use('/api/specialties', specialtyRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

console.log(process.env.MONGODB_URI);
