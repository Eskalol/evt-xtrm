var Participant = require('../../models/Participant');


module.exports = {
	listParticipantsOnEvent: listParticipantsOnEvent,
	postParticipantOnEvent: postParticipantOnEvent,
	deleteParticipantOnEvent: deleteParticipantOnEvent
};


/**
 * lists all participants on an event
 *
 * TODO:  	* only admins should have permission to view this
 * 
 * @param  {request}
 * @param  {response}
 * @return {response}
 */
function listParticipantsOnEvent(req, res) {
	Participant.find({ event: req.swagger.params.event.value },
		'_id event user',
		function(err, participants) {
			if(err || !participants) {
				return res.send(404, { message: 'participants not found' });
			}
			else {
				return res.send(200, { participants: participants });
			}
		}
	); 
}

/**
 * Post a participant to an event
 *
 * TODO:  	* admin permission can post everyone
 * 			* standard permission can only post itself
 *          * check that event is not full (limit)
 * @param  {request}
 * @param  {response}
 * @return {response}
 */
function postParticipantOnEvent(req, res) {
	Participant.create({
		event: req.swagger.params.event.value,
		user: req.body.user
	}, function(err, participant) {
		if (err || !Participant) { return res.send(400, { message: 'failed to add Participant' }); }
		else {
			return res.send(201, {
				_id: participant._id,
				event: participant.event,
				user: participant.user
			});
		}
	});
}

/**
 * Deletes a participant from an event
 *
 * TODO:  	* admin permission can delete everyone
 * 			* standard permission can only delete itself
 * 
 * @param  {request}
 * @param  {response}
 * @return {response}
 */
function deleteParticipantOnEvent(req, res) {
	Participant.remove({
		event: req.swagger.params.event.value,
		user: req.body.user
	}, function(err, status) {
		if (status.result.n === 0) { return res.send(404, { message: 'user in event not found' }); }
		else if (err) { res.send(400, { message: 'could not delete participant' }); }
		else { return res.send(200, { message: 'removed participant' }); }
	});
}
