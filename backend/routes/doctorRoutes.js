const express = require('express');
const router = express.Router();
const {
  getDoctors,
  createDoctor,
  updateDoctor,
    deleteDoctor,
    getDoctorProfile,
    searchDoctors,
} = require('../controllers/doctorController');

const { verifyToken, allowedTo } = require('../middlewares/authMiddleware')

router.use(verifyToken);

router.get('/',  allowedTo('Admin'), getDoctors);
router.get('/getDoctorsInfo',  allowedTo('Patient'), getDoctorProfile);
router.post('/create', allowedTo('Admin'), createDoctor);
router.put('/update/:id', allowedTo('Admin'), updateDoctor);
router.delete('/delete/:id', allowedTo('Admin'), deleteDoctor);


module.exports = router;