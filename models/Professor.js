const { Decimal128 } = require('mongodb');
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
    type: String,
    required: true,
  },
  evaluation: {
    type: String,
    required: true,
  },
  behavior: {
    type: String,
    required: true,
  },
  internals: {
    type: String,
    required: true,
  },
  average: {
    type: String,
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
