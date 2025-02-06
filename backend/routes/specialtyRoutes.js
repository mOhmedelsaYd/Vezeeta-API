const express = require('express');
const router = express.Router();
const {
  getSpecialties,
  createSpecialty,
  updateSpecialty,
  deleteSpecialty,
} = require('../controllers/specialtyController');

const { verifyToken, allowedTo } = require('../middlewares/authMiddleware');

router.use(verifyToken, allowedTo('Admin'));

router.get('/', getSpecialties);
router.post('/create', createSpecialty);
router.put('/update/:id', updateSpecialty);
router.delete('/delete/:id', deleteSpecialty);

module.exports = router;