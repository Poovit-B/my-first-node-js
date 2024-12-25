const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {

     const token = req.header('Authorization');
     if (!token) return res.status(401).send({ message: 'Access denied' });

     try {
          const verified = jwt.verify(token.split(' ')[1], process.env.ACCESS_TOKEN_SECRET);
          req.user = verified; // เพิ่มข้อมูลผู้ใช้ที่ยืนยันแล้วลงใน request
          next();
     } catch (error) {
          res.status(400).send({ message: 'Invalid token' });
     }
};

module.exports = authMiddleware;