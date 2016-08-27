const mongoose = require('mongoose');
const Objective = require('../models/objective');

const participationSchema = new mongoose.Schema({
  name: { type: String },
  mail: { type: String },
  groupId: { type: String, required: true },
  objectives: { type: [String], default: [] },
  created_at: { type: Date, required: true, default: Date.now() },
  updated_at: { type: Date, required: true, default: Date.now() },
});

const Participation = {
  model: mongoose.model('Participation', participationSchema),

  createParticipation(req, res) {
    const participationToCreate = req.body;
    Participation.model.create(participationToCreate, (err, participationCreated) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(participationCreated);
      }
    });
  },

  setParticipationIdentity(req, res) {
    const { _id, name, mail } = req.body;
    Participation.model.findByIdAndUpdate(_id, { $set: { name, mail } }, (err, participation) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(participation);
      }
    });
  },

  addObjective(req, res) {
    const objectiveToCreate = req.body;
    Objective.model.create(objectiveToCreate, (err, objective) => {
      if (err) {
        res.status(400).json(err);
      } else {
        Participation.model.findByIdAndUpdate(objectiveToCreate.participationId,
        { $push: { objectives: objective._id } },
        (error, update) => {
          if (error) {
            res.status(400).json(error);
          } else {
            res.status(200).json(update);
          }
        });
      }
    });
  },
};

module.exports = Participation;
