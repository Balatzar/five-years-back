const mongoose = require('mongoose');
const Group = require('./group');

const participationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mail: { type: String, required: true },
  groupId: { type: String, required: true },
  objectives: { type: [String], required: true },
  created_at: { type: Date, required: true, default: Date.now() },
  updated_at: { type: Date, required: true, default: Date.now() },
});

participationSchema.path('mail').validate(mail => {
  const mailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return mailRegex.test(mail);
}, 'Mail invalide.');

const Participation = {
  model: mongoose.model('Participation', participationSchema),

  createParticipation(req, res) {
    const participationToCreate = req.body;
    Group.model.findById(participationToCreate.groupId, (errFind, group) => {
      if (errFind || ! group) {
        return res.status(400).json(errFind || 'Groupe inconnu.');
      }
      Participation.model.create(participationToCreate, (errCreate, participationCreated) => {
        if (errCreate) {
          res.status(400).json(errCreate);
        } else {
          res.status(200).json(participationCreated);
        }
      });
    });
  },
};

module.exports = Participation;
