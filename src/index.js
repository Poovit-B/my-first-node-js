const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

const mongoURL = 'mongodb+srv://phoovita7x:tjsBryS0GzuGzW74@cluster0.fey0z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

// เชื่อมต่อ MongoDB
mongoose.connect(mongoURL, {
     useNewUrlParser: true,
     useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
     .catch(err => console.error('Could not connect to MongoDB:', err));


app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);

// เริ่มต้นเซิร์ฟเวอร์
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
