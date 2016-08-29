var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var db = require('../config/db');
autoIncrement.initialize(db);

/**
 * User schema
 * @type {mongoose.Schema}
 */
var userSchema = mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	provider: { type: String , required: true },
	providerUserId: { type: String, required: true, unique: true },
	accessToken: { type: String, required: true },
	permission: { type: String, required: true },
	dateAdded: { type: Date, default: Date.now }
});

userSchema.plugin(autoIncrement.plugin, 'User');
module.exports = db.model('User', userSchema);
