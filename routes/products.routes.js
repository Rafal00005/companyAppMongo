// Import express framework
const express = require('express');

// Create a router for products endpoints
const router = express.Router();

// Import ObjectId to work with MongoDB document IDs
const ObjectId = require('mongodb').ObjectId;

// Get all products from database
router.get('/products', (req, res) => {
	req.db
		.collection('products')
		.find()
		.toArray()
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.status(500).json({ message: err });
		});
});

// Get a random product from database
router.get('/products/random', (req, res) => {
	req.db
		.collection('products')
		.aggregate([{ $sample: { size: 1 } }])
		.toArray()
		.then((data) => {
			res.json(data[0]);
		})
		.catch((err) => {
			res.status(500).json({ message: err });
		});
});

// Get one product by id
router.get('/products/:id', (req, res) => {
	req.db
		.collection('products')
		.findOne({ _id: new ObjectId(req.params.id) })
		.then((data) => {
			if (!data) res.status(404).json({ message: 'Not found' });
			else res.json(data);
		})
		.catch((err) => {
			res.status(500).json({ message: err });
		});
});

// Add a new product to database
router.post('/products', (req, res) => {
	const { name, client } = req.body;
	req.db
		.collection('products')
		.insertOne({ name, client })
		.then(() => {
			res.json({ message: 'OK' });
		})
		.catch((err) => {
			res.status(500).json({ message: err });
		});
});

// Update a product by id
router.put('/products/:id', (req, res) => {
	const { name, client } = req.body;
	req.db
		.collection('products')
		.updateOne({ _id: new ObjectId(req.params.id) }, { $set: { name, client } })
		.then(() => {
			res.json({ message: 'OK' });
		})
		.catch((err) => {
			res.status(500).json({ message: err });
		});
});

// Delete a product by id
router.delete('/products/:id', (req, res) => {
	req.db
		.collection('products')
		.deleteOne({ _id: new ObjectId(req.params.id) })
		.then(() => {
			res.json({ message: 'OK' });
		})
		.catch((err) => {
			res.status(500).json({ message: err });
		});
});

module.exports = router;
