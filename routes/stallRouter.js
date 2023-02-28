const Stall = require('../models/Stalls');



 const getStalls = async (req,res) => {
    const { _id}= req.query;
    const userDoc = await Stall.find({blockId:_id});
    if(userDoc == null){
      res.status(404).json("error")}
      else {
        res.json({userDoc});
      }
  };

 const createStalls =  async (req,res) => {
    const {name,title,logo,desp,site,link,twitter,discord,mint,github,addr,_id} = req.body;
    try{
      const userDoc = await Stall.create({
        titleName:title,
        stallName:name,
        addresses:[],
        host:[addr],
        stallModal: {
            title:title,
            logoImage: logo,
            description:desp,
            website:site,
            workshopEmbed:link,
            twitter:twitter,
            discord:discord,
            github:github,
            mintNFT:mint
        },
        blockId:_id
      });
      res.json(userDoc);
    } catch(e) {
      console.log(e);
      res.status(400).json(e);
    }
  };

  const getStallUsers =  async (req,res) => {
    const { _id}= req.query;
    const name = req.params['id'];
    const userDoc = await Stall.findOne({stallName:name,blockId:_id}
     ) ;
    if(userDoc == null){
      res.status(404).json("error")}
      else {
        res.json(userDoc.addresses);
      }
     
   };

   const getStallModal =  async (req,res) => {
    const { _id}= req.query;
    const name = req.params['id'];
    const userDoc = await Stall.findOne({stallName:name,blockId:_id}
     ) ;
    if(userDoc == null){
      res.status(404).json("error")}
      else {
        res.json(userDoc.stallModal);
      }
     
   };

   const updateStallUsers = async (req,res) => {
    const {addr,_id} = req.body;
    const name = req.params['id'];
    const userDoc = await Stall.findOneAndUpdate({stallName:name,blockId:_id},
      { $addToSet : {addresses: addr}  } );
    if(userDoc == null){
      res.status(404).json("error")}
      else {
        res.json({userDoc});
      }
   };

   const deleteStallUsers =  async (req, res) => {
    const { addr,_id } = req.body;
    const name = req.params.id;
    const userDoc = await Stall.findOneAndUpdate(
      { stallName: name , blockId:_id},
      { $pull: { addresses: addr } },
      { new: true }
    );
  
    if (!userDoc) {
      return res.status(404).json({ error: "Stall not found" });
    }
  
    // Check if the address was successfully deleted
    if (!userDoc.addresses.includes(addr)) {
      return res.status(204).send();
    } else {
      return res.status(500).json({ error: "Failed to delete address" });
    }
  };




module.exports = {getStalls, createStalls,getStallUsers,getStallModal, updateStallUsers,deleteStallUsers};  