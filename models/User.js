const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const UserSchema = new Schema({
  image:{type: String,required: true},
  name: {type: String, required: true, min: 4, unique: true},
  address: {type: String, required: true},
  isOwner:  {
    type: Boolean,
    default: false
  },
  isHost: {
    type: Boolean,
    default: false
  },
   blockId: {
     type: Schema.Types.ObjectId,
     require:true
   },
   
  
  
});

const UserModel = model('User', UserSchema);

module.exports = UserModel;