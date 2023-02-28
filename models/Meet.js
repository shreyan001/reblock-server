const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const MeetSchema = new Schema({
  meetLogo: {
    type: String,
    required: true
  },
  meetName: {
    type: String,
    required: true,
    min: 4,
    unique: true
  },
  Owner: {
    type: String,
    required: true
  },
  meetId: {
    type: String,
    required: true,
    unique: true,
    default: function() {
      const id = Math.floor(10000 + Math.random() * 90000).toString();
      return id;
    }
  },
  channels: [{
    type: Schema.Types.ObjectId,
    ref: 'Channel'
  }],
  tables: [{
    type: Schema.Types.ObjectId,
    ref: 'Table'
  }],
  stalls: [{
    type: Schema.Types.ObjectId,
    ref: 'Stall'
  }],
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

const MeetModel = model('Meet', MeetSchema);

module.exports = MeetModel;