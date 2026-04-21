// Import express framework
const express = require('express');

// Create router
const router = express.Router();

// Import Employee controller
const EmployeeController = require('../controllers/employees.controller');

// Routes
router.get('/employees', EmployeeController.getAll);
router.get('/employees/random', EmployeeController.getRandom);
router.get('/employees/:id', EmployeeController.getById);
router.post('/employees', EmployeeController.addOne);
router.put('/employees/:id', EmployeeController.updateOne);
router.delete('/employees/:id', EmployeeController.deleteOne);

module.exports = router;
