// Import Product model
const Product = require('../models/product.model');

// Get all products
exports.getAll = async (req, res) => {
	try {
		res.json(await Product.find());
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

// Get random product
exports.getRandom = async (req, res) => {
	try {
		const count = await Product.countDocuments();
		const rand = Math.floor(Math.random() * count);
		const prod = await Product.findOne().skip(rand);
		if (!prod) res.status(404).json({ message: 'Not found' });
		else res.json(prod);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

// Get one product by id
exports.getById = async (req, res) => {
	try {
		const prod = await Product.findById(req.params.id);
		if (!prod) res.status(404).json({ message: 'Not found' });
		else res.json(prod);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

// Add new product
exports.addOne = async (req, res) => {
	try {
		const { name, client } = req.body;
		const newProduct = new Product({ name, client });
		await newProduct.save();
		res.json({ message: 'OK' });
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

// Update product by id
exports.updateOne = async (req, res) => {
	const { name, client } = req.body;
	try {
		const prod = await Product.findById(req.params.id);
		if (prod) {
			prod.name = name;
			prod.client = client;
			await prod.save();
			res.json({ message: 'OK' });
		} else res.status(404).json({ message: 'Not found...' });
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

// Delete product by id
exports.deleteOne = async (req, res) => {
	try {
		const prod = await Product.findById(req.params.id);
		if (prod) {
			await Product.deleteOne({ _id: req.params.id });
			res.json({ message: 'OK' });
		} else res.status(404).json({ message: 'Not found...' });
	} catch (err) {
		res.status(500).json({ message: err });
	}
};
