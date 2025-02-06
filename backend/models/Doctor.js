const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: mongoose.Schema.Types.ObjectId, ref: 'Specialty', required: true },
  location: { type: String, required: true },
  contact: String,
  bio: String,
  consultationFees: { type: mongoose.Schema.Types.Decimal128, required: true },
  availableTimes: [
    {
      day: { type: String, required: true, enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] },
      slots: [{ startTime: String, duration: Number }] 
    }
  ],
  experience: { type: Number, required: true },
  profilePicture: String,
  rating: { type: mongoose.Schema.Types.Decimal128, default: 0 },
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: Date,
});
// إضافة الفهرسة
doctorSchema.index({ name: 1, location: 1 });

module.exports = mongoose.model('Doctor', doctorSchema);
