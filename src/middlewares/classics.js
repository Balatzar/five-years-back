const bodyParser = require('body-parser');
const morgan = require('morgan');

module.exports = app => {
  app.use(bodyParser.json({ limit: '5mb' }));
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(morgan('dev'));
};
