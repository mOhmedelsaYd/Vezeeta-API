const Appointment = require("../models/Appointment");

const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createAppointment = async (req, res) => {
  const {
    userId,
    doctorId,
    appointmentDate,
    appointmentTime,
    duration,
    bookingStatus,
    notes,
    reason,
  } = req.body;

  try {
    const appointment = new Appointment({
      userId,
      doctorId,
      appointmentDate,
      appointmentTime,
      duration,
      bookingStatus,
      notes,
      reason,
    });

    const savedAppointment = await appointment.save();
    res.status(201).json(savedAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateAppointment = async (req, res) => {
  const { id } = req.params;
  const {
    userId,
    doctorId,
    appointmentDate,
    appointmentTime,
    duration,
    bookingStatus,
    notes,
    reason,
  } = req.body;

  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      {
        userId,
        doctorId,
        appointmentDate,
        appointmentTime,
        duration,
        bookingStatus,
        notes,
        reason,
        updatedAt: Date.now(),
      },
      { new: true }
    );

    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    await Appointment.findByIdAndDelete(id);
    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};
