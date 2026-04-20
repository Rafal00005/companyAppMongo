// import mongoose
const mongoose = require('mongoose');
// Create department schema
const departmentSchema = new mongoose.Schema({
	name: { type: String, required: true },
});
// Export department model
module.exports = mongoose.model('Department', departmentSchema);
