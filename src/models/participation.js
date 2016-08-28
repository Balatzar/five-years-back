const mongoose = require('mongoose');

const participationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mail: { type: String, required: true },
  groupId: { type: String, required: true },
  objectives: { type: [String], required: true },
  created_at: { type: Date, required: true, default: Date.now() },
  updated_at: { type: Date, required: true, default: Date.now() },
});

participationSchema.path('mail').validate(function (email) {
   var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
   return emailRegex.test(email); // Assuming email has a text attribute
}, 'Mail invalide.');

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
};

module.exports = Participation;
