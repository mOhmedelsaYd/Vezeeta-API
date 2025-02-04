const express = require('express');
const { createDoctor, getAllDoctors, updateDoctor, deleteDoctor } = require('../controllers/doctorController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

// كل المسارات دي محمية ومفتوحة للأدمن فقط
router.use(verifyToken, isAdmin);

router.post('/create', createDoctor);        // إنشاء طبيب جديد
router.get('/all', getAllDoctors);           // عرض كل الأطباء
router.put('/update/:id', updateDoctor);     // تحديث بيانات طبيب
router.delete('/delete/:id', deleteDoctor);  // حذف طبيب

module.exports = router;
