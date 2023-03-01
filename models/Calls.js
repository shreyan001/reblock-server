const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const CallSchema = new Schema({
  callLogo: {
    type: String,
    required: true
  },
  callName: {
    type: String,
    required: true,
    min: 4,
    unique: true
  },
  Owner: {
    type: String,
    required: true
  },
  callId: {
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

const CallModel = model('Call', CallSchema);

module.exports = CallModel;