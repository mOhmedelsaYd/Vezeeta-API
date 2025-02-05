const express = require("express");
const { verifyToken, isAdmin, isUser } = require('../middlewares/authMiddleware')
const router = express.Router();
const {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  confirmAppointment
} = require("../controllers/appointmentController");

router.use(verifyToken);

router.route("/").get(isAdmin, getAppointments).post(isUser, createAppointment);
router.route('/confirm').post(isUser, confirmAppointment)

router.route("/:id").put(isAdmin, updateAppointment).delete(isAdmin, deleteAppointment);

module.exports = router;
