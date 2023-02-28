const Table = require('../models/Tables');



const getAllTables = async (req,res) => {
    const { _id}= req.query;
    const userDoc = await Table.find({blockId:_id});
    if(userDoc == null){
      res.status(404).json("error")}
      else {
        res.json({userDoc});
      }
  
     
  };

  const createTables =  async (req,res) => {
    const {name,_id} = req.body;
    try{
      const userDoc = await Table.create({
        tableName:name,
        addresses:[],
        blockId:_id
      });
      res.json(userDoc);
    } catch(e) {
      console.log(e);
      res.status(400).json(e);
    }
  };


  const addTableUsers = async (req,res) => {
    const {addr,_id} = req.body;
    const name = req.params['id'];
    const userDoc = await Table.findOneAndUpdate({tableName:name,blockId:_id},
      { $addToSet : {addresses: addr}  } );
    if(userDoc == null){
      res.status(404).json("error")}
      else {
        res.json({userDoc});
      }
   };


   const deleteTableUsers = async (req, res) => {
    const { addr, _id } = req.body;
    const name = req.params.id;
   
  
    const userDoc = await Table.findOneAndUpdate(
      { tableName: name, blockId: _id, addresses: { $in: addr } },
      { $pull: { addresses: { $in: addr } } },
      { new: true }
    );
  
    if (!userDoc) {
      return res.status(404).send('Table not found.');
    }
  
    res.send(userDoc);
  };
  


  const getTableByName = async (req,res) => {
    const { _id}= req.query;
    const name = req.params['id'];
    const userDoc = await Table.findOne({tableName:name,blockId:_id}
     ) ;
    if(userDoc == null){
      res.status(404).json("error")}
      else {
        res.json(userDoc.addresses);
      }
     
   }; 

   module.exports = {getTableByName,createTables ,getAllTables,addTableUsers,deleteTableUsers};
