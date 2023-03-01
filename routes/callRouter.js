const Call = require('../models/Calls');
const Block = require('../models/Blocks');

const getCall = async (req,res) => {
    const {callId} = req.body;
    const userDoc = await Call.findOne({callId:callId});
    if(userDoc == null){
      res.status(404).json("error")}
      else {
        res.json({userDoc});
      }
  
     
  };

 const createCall =  async (req,res) => {
    const {logo,name,Owner} = req.body;
    try{
      const userDoc = await Call.create({
        callLogo:logo,
        callName:name,
        Owner:Owner,
      });
      const blockId = "63fc3a96a61ccbd5b1ab0c73"
      // Find the corresponding block and add the meet to its 'meets' array
      const blockDoc = await Block.findByIdAndUpdate(
        blockId,
      { $addToSet: { meets: userDoc._id } },
      { new: true }
    );
  
      res.json(userDoc);
    } catch(e) {
      console.log(e);
      res.status(300).json(e);
    }
  };


  module.exports = {getCall, createCall};  


