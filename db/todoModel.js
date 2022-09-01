const mongoose = require('mongoose');
const joi = require('joi');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  email: {
    type: String,
    required: true,
  },
});

const Todo = mongoose.model('Todo', todoSchema);

const validateTodo = joi.object({
  title: joi.string().required(),
  description: joi.string().required(),
  completed: joi.boolean(),
  email: joi.string().required(),
});

module.exports = {
  Todo,
  validateTodo,
};
