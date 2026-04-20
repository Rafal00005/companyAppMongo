// Import mongoose
const mongoose = require('mongoose');

// Create product schema
const productSchema = new mongoose.Schema({
	name: { type: String, required: true },
	client: { type: String, required: true },
});

// Export product model
module.exports = mongoose.model('Product', productSchema);
