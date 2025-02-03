const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: mongoose.Schema.Types.ObjectId, ref: 'Specialty', required: true }, 
  location: { type: String, required: true },
  contact: String,
  bio: String,
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }], 
});

module.exports = mongoose.model('Doctor', doctorSchema);