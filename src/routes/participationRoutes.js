const express = require('express');
const Participation = require('../models/participation');

// eslint-disable-next-line
const router = express.Router();

module.exports = () => {
  router.post('/create', Participation.createParticipation);
  router.post('/setIdentity', Participation.setParticipationIdentity);
  router.post('/addObjective', Participation.addObjective);
  return router;
};
