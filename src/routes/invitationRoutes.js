const express = require('express');
const Invitation = require('../models/invitation');

// eslint-disable-next-line
const router = express.Router();

module.exports = () => {
  router.post('/invite', Invitation.inviteEveryone);
  return router;
};
