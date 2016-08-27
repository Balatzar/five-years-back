const express = require('express');
const Objective = require('../models/objective');

// eslint-disable-next-line
const router = express.Router();

module.exports = () => {
  router.post('/validate', Objective.validate);
  return router;
};
