const express = require('express');
const { createUser, getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');

const { verifyToken, allowedTo } = require('../middlewares/authMiddleware');

const router = express.Router();

// ✅ تأكيد أن المستخدم أدمن
router.use(verifyToken, allowedTo('Admin'));

// ✅ مسارات CRUD للمستخدمين
router.post('/create', createUser);               // إنشاء مستخدم جديد
router.get('/all', getAllUsers);                  // عرض كل المستخدمين
router.get('/:id', getUserById);                  // عرض مستخدم واحد باستخدام ID ✅
router.put('/update/:id', updateUser);           // تحديث بيانات مستخدم
router.delete('/delete/:id', deleteUser);         // حذف مستخدم

module.exports = router;
