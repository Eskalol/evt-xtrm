

var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var db = require('../config/db');

autoIncrement.initialize(db);

/**
 * Event schema
 * @type {mongoose.Schema}
 */
var eventSchema = mongoose.Schema({
	title: { type: String, required: true, unique: true },
	description: { type: String, required: true },
	date: { type: Date },
	limit: Number
});
eventSchema.plugin(autoIncrement.plugin, 'Event');
module.exports = db.model('Event', eventSchema);
