const mongoose = require('mongoose');
const async = require('async');

const invitationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mail: { type: String, required: true },
  groupId: { type: String, required: true },
  created_at: { type: Date, required: true, default: Date.now() },
  updated_at: { type: Date, required: true, default: Date.now() },
});

invitationSchema.path('mail').validate(mail => {
  const mailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return mailRegex.test(mail);
}, 'Mail invalide.');

const Invitation = {
  model: mongoose.model('Invitation', invitationSchema),

  createInvitation(invitationToCreate, callback) {
    Invitation.model.create(invitationToCreate, (err, invitationCreated) => {
      if (err) {
        callback(err);
      } else {
        callback(null, invitationCreated);
      }
    });
  },

  inviteEveryone(req, res) {
    const { groupId, invitations } = req.body;
    const invitationsToCreate = invitations.map(o => Object.assign(o, { groupId }));
    async.map(invitationsToCreate, Invitation.createInvitation, (err, invitationsCreated) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(invitationsCreated);
      }
    });
  },
};

module.exports = Invitation;
