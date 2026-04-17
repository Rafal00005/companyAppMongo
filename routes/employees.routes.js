const express = require('express');
// Import express framework

const router = express.Router();
// Create a router for employees endpoints

const ObjectId = require('mongodb').ObjectId;
// Import ObjectId to work with MongoDB document IDs

/// Get all employees from database
router.get('/employees', (req, res) => {
	req.db
		.collection('employees')
		.find()
		.toArray()
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.status(500).json({ message: err });
		});
});

// Get a random employee from database
router.get('/employees/random', (req, res) => {
	req.db
		.collection('employees')
		.aggregate([{ $sample: { size: 1 } }])
		.toArray()
		.then((data) => {
			res.json(data[0]);
		})
		.catch((err) => {
			res.status(500).json({ message: err });
		});
});

// Get one employee by id
router.get('/employees/:id', (req, res) => {
	req.db
		.collection('employees')
		.findOne({ _id: new ObjectId(req.params.id) })
		.then((data) => {
			if (!data) res.status(404).json({ message: 'Not found' });
			else res.json(data);
		})
		.catch((err) => {
			res.status(500).json({ message: err });
		});
});
// Add a new employee to database
router.post('/employees', (req, res) => {
	const { firstName, lastName, department } = req.body;
	req.db
		.collection('employees')
		.insertOne({ firstName, lastName, department })
		.then(() => {
			res.json({ message: 'OK' });
		})
		.catch((err) => {
			res.status(500).json({ message: err });
		});
});

// Update an employee by id
router.put('/employees/:id', (req, res) => {
	const { firstName, lastName, department } = req.body;
	req.db
		.collection('employees')
		.updateOne(
			{ _id: new ObjectId(req.params.id) },
			{ $set: { firstName, lastName, department } },
		)
		.then(() => {
			res.json({ message: 'OK' });
		})
		.catch((err) => {
			res.status(500).json({ message: err });
		});
});

// Delete an employee by id
router.delete('/employees/:id', (req, res) => {
	req.db
		.collection('employees')
		.deleteOne({ _id: new ObjectId(req.params.id) })
		.then(() => {
			res.json({ message: 'OK' });
		})
		.catch((err) => {
			res.status(500).json({ message: err });
		});
});

module.exports = router;
