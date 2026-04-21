// Import Employee model
const Employee = require('../models/employee.model');

// Get all employees
exports.getAll = async (req, res) => {
	try {
		res.json(await Employee.find().populate('department'));
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

// Get random employee
exports.getRandom = async (req, res) => {
	try {
		const count = await Employee.countDocuments();
		const rand = Math.floor(Math.random() * count);
		const emp = await Employee.findOne().skip(rand).populate('department');
		if (!emp) res.status(404).json({ message: 'Not found' });
		else res.json(emp);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

// Get one employee by id
exports.getById = async (req, res) => {
	try {
		const emp = await Employee.findById(req.params.id).populate('department');
		if (!emp) res.status(404).json({ message: 'Not found' });
		else res.json(emp);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

// Add new employee
exports.addOne = async (req, res) => {
	try {
		const { firstName, lastName, department } = req.body;
		const newEmployee = new Employee({ firstName, lastName, department });
		await newEmployee.save();
		res.json({ message: 'OK' });
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

// Update employee by id
exports.updateOne = async (req, res) => {
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
};

// Delete employee by id
exports.deleteOne = async (req, res) => {
	try {
		const emp = await Employee.findById(req.params.id);
		if (emp) {
			await Employee.deleteOne({ _id: req.params.id });
			res.json({ message: 'OK' });
		} else res.status(404).json({ message: 'Not found...' });
	} catch (err) {
		res.status(500).json({ message: err });
	}
};
