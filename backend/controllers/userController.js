const User = require('../models/User');
const bcrypt = require('bcryptjs');

// إنشاء مستخدم جديد (من قبل الأدمن)
exports.createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    res.status(201).json({ message: 'User created successfully', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// قراءة كل المستخدمين
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // استبعاد الباسورد
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// تحديث بيانات مستخدم
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role } = req.body;

  try {
    const updatedData = { name, email, role };
    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    const user = await User.findByIdAndUpdate(id, updatedData, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'User updated successfully', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// حذف مستخدم
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
