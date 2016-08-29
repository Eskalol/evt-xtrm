var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var db = require('../config/db');

autoIncrement.initialize(db);

/**
 * participant schema
 * @type {mongoose.Schema}
 */
var participantSchema = mongoose.Schema({
	event: { type: Number, ref: 'Event', required: true },
	user: { type: Number, ref: 'User', required: true}
});
participantSchema.plugin(autoIncrement.plugin, 'Participant');
participantSchema.index({ event: 1, user: 1 }, { unique: true });
module.exports = db.model('Participant', participantSchema);
