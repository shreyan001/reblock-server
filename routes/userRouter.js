const User = require('../models/User');



const getUser = async (req,res) => {
    const {address,id} = req.body;
    const userDoc = await User.findOne({address:address, blockId:id});
    if(userDoc == null){
      res.status(280).json("error")}
      else {
        res.json({userDoc});
      }
  
     
  };

 const createUsers =  async (req,res) => {
    const {img,name,addr,_id} = req.body;
    try{
      const userDoc = await User.create({
        image:img,
        name:name,
        address:addr,
        blockId:_id
      });
      res.json(userDoc);
    } catch(e) {
      console.log(e);
      res.status(400).json(e);
    }
  };
  
  const getUsersByaddr = (req, res) => {
    const {addr,_id} = req.body;
    const addresses = addr;
  
    if (!_id || !_id.length || !addresses || !addresses.length) {
      return res.send([]);
    }
  
    User.find({ _id }, (err, user) => {
      if (err) {
        return res.send(err);
      }
  
      if (!user) {
        return res.send([]);
      }
  
      User.find({
        $and: [
          {blockId: _id },
          { $or: addresses.map((address) => ({ address })) },
        ],
      }).exec((err, users) => {
        if (err) {
          return res.send(err);
        }
  
        res.send(users);
      });
    });
  };

   module.exports = {getUser,getUsersByaddr, createUsers};  