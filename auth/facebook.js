var passport = require('passport-restify');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/User');

/**
 * Initializes facebook passport
 *
 * TODO: fix success and failure redirect.
 * 
 * @param  {object} restify server
 * @param  {object} Json with clientid and secret
 * @return {[type]}
 */
module.exports = function (server, config) {
	passport.use(new FacebookStrategy({
		clientID: config.clientID,
		clientSecret: config.clientSecret,
		callbackURL: "http://localhost:10010/auth/facebook/callback",
		profileFields: ['id', 'emails', 'displayName']
		},
		function (accessToken, refreshToken, profile, done) {
			User.findOne({
				'providerUserId': profile.id
			}, function(err, user) {
				if (err) {
					return done(err);
				}
				console.log(profile);
				console.log('wohoo');
				console.log(user);
				if (!user) {
					console.log('lager bruker');
					User.create({
						name: profile.displayName,
						email: profile.emails[0].value,
						provider: 'facebook',
						providerUserId: profile.id,
						accessToken: accessToken,
						permission: 'standard'
					}, function (err, user) {
						console.log('created');
						if (err) console.log(err);
						return done(err, user);
					});
				} else {
					console.log(user._id);
					console.log(user.providerUserId);
					return done(err, user);
				}
			});
		}
	));

	server.get('/auth/facebook', passport.authenticate('facebook', 
		{ scope: ['email'] }));

	server.get('/auth/facebook/callback', passport.authenticate('facebook',
		{
			successRedirect: '/api/event',
			failureRedirect: '/api/event/0'
		}
	));
};
