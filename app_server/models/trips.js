var mongoose = require('./db');

var tripSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  length: {
    nights: {
      type: Number,
      required: true
    },
    days: {
      type: Number,
      required: true
    }
  },
  start: {
    type: Date,
    required: true
  },
  resort: {
    type: String,
    required: true
  },
  perPerson: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: ['Beaches', 'Cruises', 'Mountains'],
    required: true
  },
  image: {
    type: String
  },
  description: {
    type: String
  },
  description2: {
    type: String
  }
});

module.exports = mongoose.model('Trip', tripSchema);

