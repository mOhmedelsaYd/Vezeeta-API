const express = require('express');
const { createUser, getAllUsers, updateUser, deleteUser } = require('../controllers/userController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

// تأكيد أن المستخدم أدمن
router.use(verifyToken, isAdmin);

router.post('/create', createUser);        // إنشاء مستخدم جديد
router.get('/all', getAllUsers);           // عرض كل المستخدمين
router.put('/update/:id', updateUser);     // تحديث بيانات مستخدم
router.delete('/delete/:id', deleteUser);  // حذف مستخدم

module.exports = router;