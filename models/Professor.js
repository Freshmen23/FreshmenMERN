const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema
const ProfessorSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  teaching: {
    type: Number,
    required: true,
  },
  evaluation: {
    type: Number,
    required: true,
  },
  behavior: {
    type: Number,
    required: true,
  },
  internals: {
    type: Number,
    required: true,
  },
  class_average: {
    type: Number,
    required: true,
    trim : true
  },
  numberOfReviews: {
    type: Number,
    required: true,
    default: 0
  },
  overall: {
    type: String,
    required: true,
    default : "",
  }
});

// Create the model from the schema
const Professor = mongoose.model('Professor', ProfessorSchema);

module.exports = Professor;
