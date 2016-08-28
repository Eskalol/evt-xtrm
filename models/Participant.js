var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var db = require('../config/db');

autoIncrement.initialize(db);

var participantSchema = mongoose.Schema({
	event: { type: Number, ref: 'Event', required: true },
	name: { type: String, required: true }
});
participantSchema.plugin(autoIncrement.plugin, 'Participant');
module.exports = db.model('Participant', participantSchema);
