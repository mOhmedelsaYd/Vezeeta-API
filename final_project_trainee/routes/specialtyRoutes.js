const express = require('express');
const router = express.Router();
const {
  getSpecialties,
  createSpecialty,
  updateSpecialty,
  deleteSpecialty,
} = require('../controllers/specialtyController');

router.get('/', getSpecialties);
router.post('/', createSpecialty);
router.put('/:id', updateSpecialty);
router.delete('/:id', deleteSpecialty);

module.exports = router;