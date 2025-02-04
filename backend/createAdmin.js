const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/vezeetaDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    const hashedPassword = await bcrypt.hash('123456', 10);

    await User.create({
      name: 'Admin',
      email: 'admin@vezeeta.com',
      password: hashedPassword,
      role: 'admin'
    });

    console.log('✅ Admin created successfully');
    mongoose.disconnect();
  })
  .catch(err => console.error(err));
