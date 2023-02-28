const mongoose = require('mongoose');
const {Schema, model} = mongoose;


const TableSchema = new Schema({
   tableName:String,
   addresses: [String],
   blockId: {
    type: Schema.Types.ObjectId,
    require: true
  }
 
});

const TableModel = model('Table', TableSchema);

module.exports = TableModel;