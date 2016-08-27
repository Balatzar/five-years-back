const RateLimit = require('express-rate-limit');

module.exports = app => { 
  const limiter = new RateLimit({
    windowMs: 1 * 60 * 1000,
    max: 100,
    delayMs: 0,
  });

  app.use(limiter);
};
