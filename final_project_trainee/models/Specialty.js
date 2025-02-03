const mongoose = require('mongoose');

const specialtySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, 
  description: String,
});

module.exports = mongoose.model('Specialty', specialtySchema);