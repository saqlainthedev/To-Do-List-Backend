const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { 
      type: String, 
      enum: ['Pending', 'In Progress', 'Complete'], // Match frontend values
      default: 'Pending', // Default to 'Pending'
      required: true 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);
