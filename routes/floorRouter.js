const Floor = require('../models/Floors');

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
    const {floorLogo,floorName,Owner} = req.body;
    try{
      const userDoc = await Floor.create({
        floorLogo:floorLogo,
        floorName:floorName,
        Owner:Owner,
      });
      res.json(userDoc);
    } catch(e) {
      console.log(e);
      res.status(300).json(e);
    }
  };


  module.exports = {getFloor, createFloor};  
