const express = require('express');
const router = express.Router();
const {
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  searchDoctors,
} = require('../controllers/doctorController');

router.get('/', getDoctors);
router.post('/', createDoctor);
router.put('/:id', updateDoctor);
router.delete('/:id', deleteDoctor);
router.get('/search', searchDoctors);

module.exports = router;