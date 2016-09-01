const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const rollbar = require('rollbar');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

// ROLLBAR

app.use(rollbar.errorHandler('process.env.ROLLBAR'));

// MONGO

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/fiveyears');

// MIDDLEWARES

const normalizedPathMiddlewares = require('path').join(__dirname, 'src/middlewares');

require('fs').readdirSync(normalizedPathMiddlewares).forEach((file) => {
  require(`./src/middlewares/${file}`)(app);
});

// Cross Domain
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Credentials', true);
  response.header('Access-Control-Allow-Origin', request.headers.origin);
  response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  response.header('Access-Control-Allow-Headers', 'X-ACCESS_TOKEN, Access-Control-Allow-Origin, Authorization, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});

// ROUTES

const groupRoutes = require('./src/routes/groupRoutes')();
app.use('/api/groups', groupRoutes);

const participationRoutes = require('./src/routes/participationRoutes')();
app.use('/api/participations', participationRoutes);

const invitationRoutes = require('./src/routes/invitationRoutes')();
app.use('/api/invitations', invitationRoutes);

// SERVER

app.get('/', (req, res) => {
  res.send('Bonjour ! Bienvenu sur l\'api du site five-years !');
});

app.listen(port);
console.log(`Magic happens on port ${port}`);
