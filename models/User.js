const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
require('dotenv').config();

// Define the schema
const UserSchema = new Schema({
    username : {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    refreshToken: {
        type: String,
    }
  },
  {
    timestamps: true
  }
);

UserSchema.methods.generateAccessToken = function(){
  return jwt.sign(
    {
      _id : this._id,
      email: this.email,
      username: this.username
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}

UserSchema.methods.generateRefreshToken = function(){
  return jwt.sign(
    {
      _id : this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}
  
  // Create the model from the schema
  const User = mongoose.model('User', UserSchema);
  
  module.exports = User;