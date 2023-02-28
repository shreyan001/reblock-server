const express = require('express');
const router = express.Router();
const channelController = require('./routes/channelRouter');
const Channel = require('./models/Channels');
const Stall = require('./models/Stalls');
const Call = require('./models/Calls');
const Floor = require('./models/Floors');
const Table = require('./models/Tables');
const Meet = require('./models/Meet');
const User = require('./models/User');
const Block = require('./models/Blocks');
const stallController = require('./routes/stallRouter');
const tableController = require('./routes/tableRouter');
const meetController = require('./routes/meetRouter');
const userController = require('./routes/userRouter');
const callController = require('./routes/callRouter');
const blockController = require('./routes/blockRouter');
const floorController = require('./routes/floorRouter');


router.get('/api/channels', channelController.getChannels);
router.post('/api/channels', channelController.createChannels);
router.get('/api/channels/:id', channelController.getChannelHosts);
router.put('/api/channels/:id', channelController.editChannels);

router.get('/api/stalls', stallController.getStalls);
router.post('/api/stalls', stallController.createStalls);
router.get('/api/stalls/:id', stallController.getStallUsers);
router.get('/api/stalls/modal/:id', stallController.getStallModal);
router.put('/api/stalls/:id', stallController.updateStallUsers);
router.delete('/api/stalls/:id', stallController.deleteStallUsers);

router.get('/api/tables', tableController.getAllTables);
router.put('/api/tables/:id', tableController.addTableUsers);
router.delete('/api/tables/:id', tableController.deleteTableUsers);
router.get('/api/tables/:id', tableController.getTableByName);
router.post('/api/tables/add', tableController.createTables);

router.post('/api/login', userController.getUser);
router.post('/api/register', userController.createUsers);
router.post('/api/users/', userController.getUsersByaddr);


router.post('/api/calls', callController.createCall);
router.post('/api/calls/get', callController.getCall);

router.post('/api/floor', floorController.createFloor);
router.post('/api/floor/get', floorController.getFloor);

router.post('/api/meets', meetController.createMeet);
router.post('/api/meets/get', meetController.getMeet);

router.post('/api/blocks/search', blockController.searchId);
router.put('/api/blocks/add/meet', blockController.assignMeet);
router.put('/api/blocks/add/call', blockController.assignCall);
router.put('/api/blocks/add/floor', blockController.assignFloor);

module.exports = router;