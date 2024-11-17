// models/Car.js
const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  tags: [String],
  images: [String],
  car_type: String,
  company: String,
  dealer: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Car', carSchema);
