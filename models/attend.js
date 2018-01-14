const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const goingSchema = new Schema({
  place: String,
  user: [String],
  attending: Number
}, {timestamps: true});

const ModelClass = mongoose.model('attend', goingSchema);
module.exports = ModelClass
