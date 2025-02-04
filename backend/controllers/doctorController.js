const Doctor = require('../models/Doctor');

// إنشاء طبيب جديد
exports.createDoctor = async (req, res) => {
  const { name, specialty, email, phone, available } = req.body;

  try {
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) return res.status(400).json({ message: 'Doctor already exists' });

    const doctor = new Doctor({ name, specialty, email, phone, available });
    await doctor.save();

    res.status(201).json({ message: 'Doctor created successfully', doctor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// عرض كل الأطباء
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// تحديث بيانات طبيب
exports.updateDoctor = async (req, res) => {
  const { id } = req.params;
  const { name, specialty, email, phone, available } = req.body;

  try {
    const doctor = await Doctor.findByIdAndUpdate(
      id,
      { name, specialty, email, phone, available },
      { new: true }
    );

    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

    res.json({ message: 'Doctor updated successfully', doctor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// حذف طبيب
exports.deleteDoctor = async (req, res) => {
  const { id } = req.params;

  try {
    const doctor = await Doctor.findByIdAndDelete(id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

    res.json({ message: 'Doctor deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
