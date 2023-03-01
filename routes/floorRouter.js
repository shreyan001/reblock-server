const Floor = require('../models/Floors');
const Block = require('../models/Blocks');

const getFloor = async (req,res) => {
    const {floorId} = req.body;
    const userDoc = await Floor.findOne({floorId:floorId});
    if(userDoc == null){
      res.status(404).json("error")}
      else {
        res.json({userDoc});
      }
  };

 const createFloor =  async (req,res) => {
    const {name,logo,Owner} = req.body;
    try{
      const userDoc = await Floor.create({
        floorLogo:logo,
        floorName:name,
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


  module.exports = {getFloor, createFloor};  
