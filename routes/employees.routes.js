// Import express framework
const express = require('express');

// Create router
const router = express.Router();

// Import Employee model
const Employee = require('../models/employee.model');

// Get all employees from database with department data
router.get('/employees', async (req, res) => {
	try {
		res.json(await Employee.find().populate('department'));
	} catch (err) {
		res.status(500).json({ message: err });
	}
});
// Get random employee from database
router.get('/employees/random', async (req, res) => {
	try {
		const count = await Employee.countDocuments();
		const rand = Math.floor(Math.random() * count);
		const emp = await Employee.findOne().skip(rand);
		if (!emp) res.status(404).json({ message: 'Not found' });
		else res.json(emp);
	} catch (err) {
		res.status(500).json({ message: err });
	}
});

/// Get one employee by id with department data
router.get('/employees/:id', async (req, res) => {
	try {
		const emp = await Employee.findById(req.params.id).populate('department');
		if (!emp) res.status(404).json({ message: 'Not found' });
		else res.json(emp);
	} catch (err) {
		res.status(500).json({ message: err });
	}
});

// Add new employee to database
router.post('/employees', async (req, res) => {
	try {
		const { firstName, lastName, department } = req.body;
		const newEmployee = new Employee({ firstName, lastName, department });
		await newEmployee.save();
		res.json({ message: 'OK' });
	} catch (err) {
		res.status(500).json({ message: err });
	}
});

// Update employee by id
router.put('/employees/:id', async (req, res) => {
	const { firstName, lastName, department } = req.body;
	try {
		const emp = await Employee.findById(req.params.id);
		if (emp) {
			emp.firstName = firstName;
			emp.lastName = lastName;
			emp.department = department;
			await emp.save();
			res.json({ message: 'OK' });
		} else res.status(404).json({ message: 'Not found...' });
	} catch (err) {
		res.status(500).json({ message: err });
	}
});

// Delete employee by id
router.delete('/employees/:id', async (req, res) => {
	try {
		const emp = await Employee.findById(req.params.id);
		if (emp) {
			await Employee.deleteOne({ _id: req.params.id });
			res.json({ message: 'OK' });
		} else res.status(404).json({ message: 'Not found...' });
	} catch (err) {
		res.status(500).json({ message: err });
	}
});

module.exports = router;
