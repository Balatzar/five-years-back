const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 4000;

// MONGO

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_ADDRESS || 'mongodb://localhost:27017/fiveyears');

// MIDDLEWARES

const normalizedPathMiddlewares = require('path').join(__dirname, 'src/middlewares');

require('fs').readdirSync(normalizedPathMiddlewares).forEach((file) => {
  require(`./src/middlewares/${file}`)(app);
});

// ROUTES

const groupRoutes = require('./src/routes/groupRoutes')();
app.use('/api/groups', groupRoutes);

const participationRoutes = require('./src/routes/participationRoutes')();
app.use('/api/participations', participationRoutes);

const objectiveRoutes = require('./src/routes/objectiveRoutes')();
app.use('/api/objectives', objectiveRoutes);

// SERVER

app.listen(port);
console.log(`Magic happens on port ${port}`);
