const Task = require('../Model/model');
const mongoose = require('mongoose');

// Get all tasks
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve tasks", details: error.message });
    }
};


// Add a new task
exports.addTask = async (req, res) => {
    try {
      const { title, description, status } = req.body;
  
      // Validate required fields
      if (!title || !description || !status) {
        return res.status(400).json({ error: "Title, description, and status are required" });
      }
  
      // Validate status
      const validStatuses = ['Pending', 'In Progress', 'Complete'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: "Invalid status value" });
      }
  
      const newTask = new Task({ title, description, status });
      const savedTask = await newTask.save();
      res.status(201).json(savedTask);
    } catch (error) {
      res.status(500).json({ error: "Failed to create task", details: error.message });
    }
  };
  

// Update a task
exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate the ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid Task ID" });
        }

        const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!updatedTask) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: "Failed to update task", details: error.message });
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate the ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid Task ID" });
        }

        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete task", details: error.message });
    }
};
