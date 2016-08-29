var passport = require('passport-restify');
var restify = require('restify');
var sessions = require('client-sessions');
var User = require('../models/User');

/**
 * Initializes session and passport
 * 
 * @param  {object} restify server
 * @param  {string} secret session key
 * @return {[type]}
 */
module.exports = function (server, secret) {
	server.use(restify.queryParser());
	server.use(restify.bodyParser());
	server.use(restify.authorizationParser());

	server.use(sessions({
	    // cookie name dictates the key name added to the request object
	    cookieName: 'session',
	    // should be a large unguessable string
	    secret: secret,
	    // how long the session will stay valid in ms
	    duration: 24 * 60 * 60 * 1000    
	}));

	// Initialize passport
	server.use(passport.initialize()); 
	// Set up the passport session
	server.use(passport.session());

	// This is how a user gets serialized
	passport.serializeUser(function(user, done) {
	    done(null, user._id);
	});

	// This is how a user gets deserialized
	passport.deserializeUser(function(id, done) {
	    User.findOne({ '_id': id }, function (err, user) {
	    	if(!err && user) {
	    		return done(null, user);
	    	} else {
	    		return done(null, false, { error: 'deserialization failed' })
	    	}
	    })
	});
};