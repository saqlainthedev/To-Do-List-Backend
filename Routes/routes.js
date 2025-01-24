const express = require('express');
const { getTasks, addTask, updateTask, deleteTask } = require('../Controller/controller');
const router = express.Router();

// Routes
router.get('/tasks', getTasks); // Get all tasks
router.post('/tasks', addTask); // Add a new task
router.put('/tasks/:id', updateTask); // Update a task by ID
router.delete('/tasks/:id', deleteTask); // Delete a task by ID

module.exports = router;