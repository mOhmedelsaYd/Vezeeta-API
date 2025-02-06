const jwt = require('jsonwebtoken');

const SECRET_KEY = 'secretkey'; // ✅ المفتاح السري الموحد

// ✅ التحقق من التوكن
exports.verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1]; // ✅ استخراج التوكن بعد Bearer

  if (!token) {
    return res.status(401).json({ message: 'Access denied. Invalid token format.' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY); // ✅ المفتاح السري الموحد
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token', error: err.message });
  }
};

exports.allowedTo = (...roles) => 
    async (req, res, next) => {
        //1- check user role
        if (!(roles.includes(req.user.role)))
            return res.status(403).json({ error: "You have no permission to perform this action" });

        next();
    }
