// Import express framework
const express = require('express');

// Create router
const router = express.Router();

// Import Department controller
const DepartmentController = require('../controllers/departments.controller');

// Routes
router.get('/departments', DepartmentController.getAll);
router.get('/departments/random', DepartmentController.getRandom);
router.get('/departments/:id', DepartmentController.getById);
router.post('/departments', DepartmentController.addOne);
router.put('/departments/:id', DepartmentController.updateOne);
router.delete('/departments/:id', DepartmentController.deleteOne);

module.exports = router;
