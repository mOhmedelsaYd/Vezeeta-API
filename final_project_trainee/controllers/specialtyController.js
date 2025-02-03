const Specialty = require('../models/Specialty');

const getSpecialties = async (req, res) => {
  try {
    const specialties = await Specialty.find();
    res.json(specialties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createSpecialty = async (req, res) => {
  const specialty = new Specialty(req.body);
  try {
    const newSpecialty = await specialty.save();
    res.status(201).json(newSpecialty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateSpecialty = async (req, res) => {
  try {
    const updatedSpecialty = await Specialty.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedSpecialty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteSpecialty = async (req, res) => {
  try {
    await Specialty.findByIdAndDelete(req.params.id);
    res.json({ message: 'Specialty deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getSpecialties,
  createSpecialty,
  updateSpecialty,
  deleteSpecialty,
};