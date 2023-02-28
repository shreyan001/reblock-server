const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const FloorSchema = new Schema({
  floorLogo: {
    type: String,
    required: true
  },
  floorName: {
    type: String,
    required: true,
    min: 4,
    unique: true
  },
  Owner: {
    type: String,
    required: true
  },
  floorId: {
    type: String,
    required: true,
    unique: true,
    default: function() {
      const id = Math.floor(10000 + Math.random() * 90000).toString();
      return id;
    }
  },
  tables: [{
    type: Schema.Types.ObjectId,
    ref: 'Table'
  }],
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

const FloorModel = model('Floor', FloorSchema);

module.exports = FloorModel;