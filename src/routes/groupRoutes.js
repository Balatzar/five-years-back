const express = require('express');
const Group = require('../models/group');

// eslint-disable-next-line
const router = express.Router();

module.exports = () => {
  router.post('/create', Group.createGroup);
  router.post('/setCreator', Group.setCreatorName);
  router.post('/addParticipation', Group.addParticipation);
  return router;
};
