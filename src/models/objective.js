const mongoose = require('mongoose');

const objectiveSchema = new mongoose.Schema({
  text: { type: String, required: true },
  participationId: { type: String, required: true },
  validated: { type: Boolean, default: false },
  created_at: { type: Date, required: true, default: Date.now() },
  updated_at: { type: Date, required: true, default: Date.now() },
});

const Objective = {
  model: mongoose.model('objective', objectiveSchema),

  validate(req, res) {
    const { _id, validated } = req.body;
    Objective.model.findByIdAndUpdate(_id, { $set: { validated } }, (err, objective) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(objective);
      }
    });
  },
};

module.exports = Objective;
