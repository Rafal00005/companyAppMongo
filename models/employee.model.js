// Import mongoose
const mongoose = require('mongoose');

// Create employee schema
const employeeSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	department: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Department',
		required: true,
	},
});

// Export employee model
module.exports = mongoose.model('Employee', employeeSchema);
