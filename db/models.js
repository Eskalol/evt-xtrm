'use strict';

var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var db = require('./db');

autoIncrement.initialize(db);

// Event
var eventSchema = mongoose.Schema({
	title: { type: String, required: true, unique: true },
	description: { type: String, required: true },
	date: { type: Date },
	limit: Number
});
eventSchema.plugin(autoIncrement.plugin, 'Event');
var event = db.model('Event', eventSchema);




var participantSchema = mongoose.Schema({
	event: { type: Number, ref: 'Event', required: true },
	name: { type: String, required: true }
});
participantSchema.plugin(autoIncrement.plugin, 'Participant');
var participant = db.model('Participant', participantSchema);

module.exports = {
	event: event,
	participant: participant
};
