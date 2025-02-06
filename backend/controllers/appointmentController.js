const Appointment = require("../models/Appointment");
const Doctor = require('../models/Doctor');
const moment = require('moment');

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.createAppointment = async (req, res) => {
  const { userId, doctorId, appointmentDate, appointmentTime, duration, reason } = req.body;

  try {
    // Fetch the doctor with availableTimes
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Get the day of the week for the requested appointment date
    const requestedDay = new Date(appointmentDate).toLocaleString("en-US", { weekday: "long" });

    // Find matching available slots for the requested day
    const availableDay = doctor.availableTimes.find(day => day.day === requestedDay);

    if (!availableDay) {
      return res.status(400).json({ message: "Doctor is not available on this day." });
    }

    const requestedEndTime = new Date(`2025-01-01T${appointmentTime}`);
    requestedEndTime.setMinutes(requestedEndTime.getMinutes() + duration);
    const formattedEndTime = requestedEndTime.toTimeString().slice(0, 5);

    // Check if the slot is available within doctor's schedule
    const isSlotAvailable = availableDay.slots.some(slot => {
      const slotStart = new Date(`2025-01-01T${slot.startTime}`);
      const slotEnd = new Date(slotStart.getTime() + slot.duration * 60000);

      return (
        appointmentTime >= slot.startTime &&
        formattedEndTime <= slotEnd.toTimeString().slice(0, 5) &&
        duration <= slot.duration
      );
    });

    if (!isSlotAvailable) {
      return res.status(400).json({ message: "Requested slot is not available." });
    }

    // Check for conflicting appointments
    const conflictingAppointments = await Appointment.find({
      doctorId,
      appointmentDate,
      $or: [
        {
          appointmentTime: { $gte: appointmentTime, $lt: formattedEndTime }
        }
      ]
    });

    if (conflictingAppointments.length) {
      return res.status(400).json({ message: "Requested time slot is already booked." });
    }

    // Create the new appointment
    const newAppointment = new Appointment({
      userId,
      doctorId,
      appointmentDate,
      appointmentTime,
      duration,
      reason,
    });

    const savedAppointment = await newAppointment.save();

    return res.status(201).json(savedAppointment);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};






exports.updateAppointment = async (req, res) => {
  const { id } = req.params;
  const {
    userId,
    doctorId,
    appointmentDate,
    appointmentTime,
    duration,
    bookingStatus,
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

exports.deleteAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    await Appointment.findByIdAndDelete(id);
    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.confirmAppointment = async (req, res, next) => {
  try {
    const { appointmentId, doctorId } = req.body;

    // Fetch doctor and appointment details
    const doctor = await Doctor.findById(doctorId);
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (appointment.bookingStatus === "Confirmed") {
      return res.status(400).json({ message: "This appointment is already confirmed" });
    }

    // Extract appointment date and time
    const appointmentDay = new Date(appointment.appointmentDate).toLocaleString("en-US", { weekday: "long" });
    const appointmentTime = appointment.appointmentTime;

    // Update the doctor's availableTimes to remove the confirmed slot
    const updatedDoctor = await Doctor.findOneAndUpdate(
      { _id: doctorId, "availableTimes.day": appointmentDay },
      {
        $pull: {
          "availableTimes.$.slots": { startTime: appointmentTime }
        }
      },
      { new: true } // Return the updated doctor document
    );

    if (!updatedDoctor) {
      return res.status(400).json({ message: "No available slot found for this day and time." });
    }

    // Add the appointment to the doctor's appointments array
    doctor.appointments.push(appointment._id);
    await doctor.save();

    // Confirm the appointment
    appointment.bookingStatus = "Confirmed";
    await appointment.save();

    return res.status(200).json({
      message: "Appointment confirmed successfully and slot removed from availability",
      appointment
    });
  } catch (error) {
    return res.status(500).json({ message: "Error confirming appointment", error });
  }
};






