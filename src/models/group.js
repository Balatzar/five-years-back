const mongoose = require('mongoose');
const createSlug = require('../modules/createSlug');

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String },
  creator: { type: String },
  partipations: { type: [String], default: [] },
  created_at: { type: Date, required: true, default: Date.now() },
  updated_at: { type: Date, required: true, default: Date.now() },
});

const Group = {
  model: mongoose.model('Group', groupSchema),

  createGroup(req, res) {
    const groupToCreate = req.body;
    groupToCreate.slug = createSlug(groupToCreate.name);
    Group.model.create(groupToCreate, (err, groupCreated) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(groupCreated);
      }
    });
  },

  setCreatorName(req, res) {
    const { _id, creatorId } = req.body;
    Group.model.findByIdAndUpdate(_id, { $set: { creator: creatorId } }, (err, group) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(group);
      }
    });
  },

  addParticipation(req, res) {
    const { _id, participationId } = req.body;
    Group.model.findByIdAndUpdate(_id,
    { $push: { partipations: participationId } },
    (err, group) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(group);
      }
    });
  },
};

module.exports = Group;
