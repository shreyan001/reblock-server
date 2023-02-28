const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const ChannelSchema = new Schema({
   topicName: { type: String, required: true },
   channelName: { type: String, required: true },
   addresses: [String],
   host: [String],
   blockId: {
     type: Schema.Types.ObjectId,
     require: true
   }
});

const ChannelModel = model('Channel', ChannelSchema);

module.exports = ChannelModel;