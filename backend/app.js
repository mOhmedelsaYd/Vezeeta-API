const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const specialtyRoutes = require('./routes/specialtyRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// مسارات التطبيق
app.use('/api/auth', authRoutes);       // مسارات تسجيل الدخول وتسجيل المستخدمين
app.use('/api/specialty', specialtyRoutes);       // مسارات تسجيل الدخول وتسجيل المستخدمين
app.use('/api/appointment', appointmentRoutes);    // مسارات مواعيد الاستشارات الطبيه
app.use('/api/users', userRoutes);      // مسارات CRUD للمستخدمين 
app.use('/api/doctors', doctorRoutes);  // مسارات CRUD للأطباء

module.exports = app;
