const Doctor = require('../models/Doctor');

const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate('specialty');  
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createDoctor = async (req, res) => {
  const doctor = new Doctor(req.body);
  try {
    const newDoctor = await doctor.save();
    res.status(201).json(newDoctor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateDoctor = async (req, res) => {
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedDoctor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.json({ message: 'Doctor deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const searchDoctors = async (req, res) => {
  const { specialty, location, name } = req.query;
  const query = {};

  if (specialty) {
    query.specialty = specialty;
  }
  if (location) {
    query.location = { $regex: location, $options: 'i' }; 
  }
  if (name) {
    query.name = { $regex: name, $options: 'i' }; 
  }

  try {
    const doctors = await Doctor.find(query).populate('specialty');
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  searchDoctors,
};