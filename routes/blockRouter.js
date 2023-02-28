
const Block = require('../models/Blocks');
const Call = require('../models/Calls');
const Floor = require('../models/Floors');
const Meet = require('../models/Meet');
const User = require('../models/User');

const searchId = async (req, res) => {
    const { Id } = req.body;
    console.log(Id)
  
    try {
      const block = await Block.findOne({Id})
        .populate({
          path: 'meets',
          match: { meetId :Id},
          select: '_id meetId meetName meetLogo channels tables stalls users'
        })
        .populate({
          path: 'calls',
          match: { callId: Id },
          select: '_id callId callName callLogo stalls users'
        })
        .populate({
          path: 'floors',
          match: { floorId: Id },
          select: '_id floorId floorName floorLogo tables users'
        })
        .select('-_id -__v')
        .lean();
  
        if (!block) {
            return res.status(404).json({ error: 'Block not found' });
          }
  
      const result = {};
  
      if (block.meets && block.meets.length > 0) {
        result.meet = block.meets[0];
      }
  
      if (block.calls && block.calls.length > 0) {
        result.call = block.calls[0];
      }
  
      if (block.floors && block.floors.length > 0) {
        result.floor = block.floors[0];
      }
  
      if (Object.keys(result).length === 0) {
        return res.status(292).json({ error: 'Document not found' });
      }
  
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  

const assignCall = async (req,res) => {
    const {call} = req.body;
    try{
      const userDoc = await Block.findOneAndUpdate({
         $addToSet : {calls:call}  
       
      });
      res.json(userDoc);
    } catch(e) {
      console.log(e);
      res.status(400).json(e);
    }
  };
  
  const assignMeet = async (req,res) => {
    const {meet} = req.body;
    try{
      const userDoc = await Block.findOneAndUpdate({
         $addToSet : {meets:meet}  
       
      });
      res.json(userDoc);
    } catch(e) {
      console.log(e);
      res.status(400).json(e);
    }
  };

  const assignFloor = async (req,res) => {
    const {floor} = req.body;
    try{
      const userDoc = await Block.findOneAndUpdate({
         $addToSet : {floors:floor}  
       
      });
      res.json(userDoc);
    } catch(e) {
      console.log(e);
      res.status(400).json(e);
    }
  };



module.exports = {searchId,assignCall,assignFloor,assignMeet}; 