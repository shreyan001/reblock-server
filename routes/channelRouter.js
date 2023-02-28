const Channel = require('../models/Channels');



 const getChannels = async (req,res) => {
    const { _id}= req.query;
  
    const userDoc = await Channel.find({blockId:_id});
    if(userDoc == null){
      res.status(404).json("error")}
      else {
        res.json({userDoc});
      }
  };

 const createChannels =  async (req,res) => {
    const {name,topic,_id,host} = req.body;
    try{
      const userDoc = await Channel.create({
        topicName:topic,
        channelName:name,
        addresses:[],
        host:[host],
        blockId:_id
      });
      res.json(userDoc);
    } catch(e) {
      console.log(e);
      res.status(400).json(e);
    }
  };

  const getChannelHosts =  async (req,res) => {
    
    const name = req.params['id'];
    const {_id} = req.query;
    const userDoc = await Channel.findOne({blockId:_id,ChannelName:name}
     ) ;
    if(userDoc == null){
      res.status(404).json("error")}
      else {
        res.json(userDoc.host);
      }
     
   };


 const editChannels  =  async (req,res) => {
 const {name,topic,_id,host} = req.body;
 const userDoc = await Channel.findOneAndUpdate({blockId:_id,ChannelName:name},
        {  
            topicName:topic,
            channelName:name,
            addresses:[],
            host:[host],
          },{
            new: true
          }
          );
    if(userDoc == null){
      res.status(404).json("error")}
      else {
        res.json({userDoc});
      }
   };


module.exports = {getChannels,editChannels, createChannels,getChannelHosts};  