const mongoose = require('mongoose');
const createSlug = require('../modules/createSlug');

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String },
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
};

module.exports = Group;
