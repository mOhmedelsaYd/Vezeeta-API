const express = require("express");
const { verifyToken, allowedTo } = require('../middlewares/authMiddleware')
const router = express.Router();
const {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  confirmAppointment
} = require("../controllers/appointmentController");

router.use(verifyToken);

router.route("/").get(allowedTo('Admin'), getAppointments).post(allowedTo('Patient'), createAppointment);
router.route('/confirm').post(allowedTo('Patient'), confirmAppointment)

router.route("/:id").put(allowedTo('Admin'), updateAppointment).delete(allowedTo('Admin'), deleteAppointment);

module.exports = router;
