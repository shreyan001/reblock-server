const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const BlockSchema = new Schema({
 
  meets: [{
    type: Schema.Types.ObjectId,
    ref: 'Meet'
  }],
  calls: [{
    type: Schema.Types.ObjectId,
    ref: 'Call'
  }],
  floors: [{
    type: Schema.Types.ObjectId,
    ref: 'Floor'
  }]
});

const BlockModel = model('Block', BlockSchema);

module.exports = BlockModel;