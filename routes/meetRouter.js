const Meet = require('../models/Meet');
const Block = require('../models/Blocks');

const getMeet = async (req,res) => {
    const {meetId} = req.body;
    const userDoc = await Meet.findOne({meetId:meetId});
    if(userDoc == null){
      res.status(404).json("error")}
      else {
        res.json({userDoc});
      }
  
     
  };

  const createMeet = async (req, res) => {
    const { logo, name, Owner } = req.body;
    try {
      const meetDoc = await Meet.create({
        meetLogo: logo,
        meetName: name,
        Owner: Owner,
      });
  
      // Find the corresponding block and add the meet to its 'meets' array
      const blockDoc = await Block.findOneAndUpdate(
        { $addToSet: { meets: meetDoc._id } },
        { new: true }
      );
  
      res.json(meetDoc);
    } catch (e) {
      console.log(e);
      res.status(300).json(e);
    }
  };
  

  const assignUsers = async (req,res) => {
    const {userId} = req.body;
    try{
      const userDoc = await Meet.findOneAndUpdate({},{
         $addToSet : {users:userId}  
       
      });
      res.json(userDoc);
    } catch(e) {
      console.log(e);
      res.status(400).json(e);
    }
  };

  module.exports = {getMeet, createMeet};  
