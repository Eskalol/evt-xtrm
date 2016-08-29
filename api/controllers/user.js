'use strict';

var User = require('../../models/User');

module.exports = {
	listUsers: listUsers,
	getUserById: getUserById,
	deleteUserById: deleteUserById,
	updateUserPermission: updateUserPermission
}

/**
 * lists all users
 *
 * TODO: only admins should be able to list users
 * 
 * @param  {request}
 * @param  {response}
 * @return {response}
 */
function listUsers(req, res) {
	User.find({},
		'_id name email permission dateAdded',
		function (err, users) {
			if (err || !users) { return res.send(400, { message: 'could not list users '}); }
			else { return res.send(200, { users: users }); }
		}
	);
}


/**
 * gets a user by id
 *
 * TODO: only admins should be able to get user
 * 
 * @param  {request}
 * @param  {response}
 * @return {response}
 */
function getUserById(req, res) {
	User.findOne({ _id: req.swagger.params.id.value },
		'_id name email permission dateAdded',
		function (err, user) {
			if (err || !user) { return res.send(404, { message: 'user not found' }); }
			else { return res.send(200, user); }
		}
	);
}

/**
 * deletes a user by id
 *
 * TODO: only admins should be able to delete a user
 * 
 * @param  {request}
 * @param  {response}
 * @return {response}
 */
function deleteUserById(req, res) {
	User.remove({
		_id: req.swagger.params.id.value
		}, function (err, status) {
			if (status.result.n == 0 ) { return res.send(404, { message: 'User not found' }); }
			else if (err) { return res.send(400, { message: 'could not delete user' }); }
			else { return res.send(200, { message: 'removed user' }); }
		}
	);
}


/**
 * updates a users permission level (standard, admin)
 *
 * TODO: check permission level, only admins should be able to grant permission
 * 
 * @param  {request}
 * @param  {response}
 * @return {response}
 */
function updateUserPermission(req, res) {
	User.findOne({ _id: req.swagger.params.id.value }, function(err, user) {
		if (err || !user) { return res.send(404, { message: "Not found" }); }
		else {
			User.findByIdAndUpdate(
				req.swagger.params.id.value,
				{ $set: { permission: req.body.permission } },
				function (error, usr) {
					if (error) { return res.send(400, { message: error }); }
					else { return res.send(200, usr); }
				}
			);
		}
	});
}