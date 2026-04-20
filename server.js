const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Import routes
const employeesRoutes = require('./routes/employees.routes');
const departmentsRoutes = require('./routes/departments.routes');
const productsRoutes = require('./routes/products.routes');

// Create express app
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', employeesRoutes);
app.use('/api', departmentsRoutes);
app.use('/api', productsRoutes);

app.use((req, res) => {
	res.status(404).send({ message: 'Not found...' });
});

// Connect to MongoDB database using Mongoose
mongoose.connect('mongodb://0.0.0.0:27017/companyDB', {
	useNewUrlParser: true,
});
const db = mongoose.connection;

// Event listener for successful connection
db.once('open', () => {
	console.log('Connected to the database');
});

// Event listener for connection error
db.on('error', (err) => console.log('Error ' + err));

// Start server
app.listen('8000', () => {
	console.log('Server is running on port: 8000');
});
