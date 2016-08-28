const mongoose = require('mongoose');
const async = require('async');
const sendMail = require('../modules/sendMail');
const makeInvitationTemplate = require('../modules/mails/makeInvitationTemplate');

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
    Invitation.model.create(invitationToCreate, (err, inv) => {
      if (err) {
        callback(err);
      } else {
        const templateInvitation = makeInvitationTemplate();
        sendMail('balthazar@fiveyears.fr',
          inv.mail,
          'Vous avez été invité !',
          templateInvitation,
          callback);
      }
    });
  },

  inviteEveryone(req, res) {
    const { groupId, invitations } = req.body;
    const invitationsToCreate = invitations.map(o => Object.assign(o, { groupId }));
    async.map(invitationsToCreate, Invitation.createInvitation, (err, invitationsCreated) => {
      if (err) {
        console.warn(err);
        res.status(400).json(err);
      } else {
        res.status(200).json(`${invitationsCreated.length} personnes ont bien été invité`);
      }
    });
  },
};

module.exports = Invitation;
