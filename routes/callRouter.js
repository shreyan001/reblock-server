const Call = require('../models/Calls');

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
    const {callLogo,callName,Owner} = req.body;
    try{
      const userDoc = await Call.create({
        callLogo:callLogo,
        callName:callName,
        Owner:Owner,
      });
      res.json(userDoc);
    } catch(e) {
      console.log(e);
      res.status(300).json(e);
    }
  };


  module.exports = {getCall, createCall};  


