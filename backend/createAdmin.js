const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

mongoose.connect('mongodb+srv://mohamedelsaid3963:tttgggaaa7689%40A@cluster0.v8vowgg.mongodb.net/vezeetaDB')
  .then(async () => {
    const hashedPassword = await bcrypt.hash('123456', 10);

    await User.create({
      name: 'Admin',
      email: 'admin@vezeeta.com',
      password: hashedPassword,
      role: 'Admin',
      phoneNumber: "01232799210",
      dateOfBirth: "2025-02-05",
      gender: "Male"
    });

    console.log('✅ Admin created successfully');
    mongoose.disconnect();
  })
  .catch(err => console.error(err));
