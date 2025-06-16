const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/f1drivers'; // fallback for local dev

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => console.error('MongoDB connection error:', error));
db.once('open', () => console.log('Connected to MongoDB'));

const app = express();
app.use(cors()) 
app.use(express.json());

const driversRoute = require('./routes/drivers');
app.use('/drivers', driversRoute);
const usersRoute = require('./routes/users');
app.use('/users', usersRoute)

app.listen(3002, () => console.log('Server is running on port 3002'));