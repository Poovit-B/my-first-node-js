const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');

// สร้าง route แรก
app.get('/', (req, res) => {
     res.send('Hello, World! Welcome to my first Node.js app!');
});

// ตั้งค่าเซิร์ฟเวอร์ให้รันที่พอร์ต 3000
const PORT = 3000;
app.listen(PORT, () => {
     console.log(`Server is running on http://localhost:${PORT}`);
});

app.use(bodyParser.json());
app.use((req, res, next) => {
     console.log(`${req.method} ${req.url}`);
     next(); // ส่งต่อไปยังฟังก์ชันถัดไป
});

app.use('/api', apiRoutes);
