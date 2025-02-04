const express = require("express");
const router = express.Router();
const {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointmentController");

router.route("/").get(getAppointments).post(createAppointment);

router.route("/:id").put(updateAppointment).delete(deleteAppointment);

module.exports = router;
