'use strict';

var Event = require('../../models/Event');


module.exports = {
	listEvents: listEvents,
	createEvent: createEvent,
	getEventById: getEventById,
	deleteEventById: deleteEventById,
	updateEventById: updateEventById
};

function listEvents(req, res) {
	Event.find({},
		'_id title description limit date',
		function (err, events) {
			if (err || !events) { return res.send(400, { message: 'could not list events' }); }
			else { return res.json(200, { events: events }); }
		}
	);
}

function createEvent(req, res) {
	Event.create(req.body, function(err, event) {
		if (err || !event) { return res.send(400, { message: 'failed to add event' }); }
		else {
			return res.send(201, {
				_id: event._id,
				title: event.title,
				description: event.description,
				date: event.date,
				limit: event.limit
			});
		}
	});
}

function getEventById(req, res) {
	console.log(req.swagger.params.id.value);
	Event.findOne({ _id: req.swagger.params.id.value },
		'_id title description limit date',
		function (err, event) {
			if(err || !event) { return res.send(404, { messege: 'could not find event' }); }
			else {return res.send(200, event); }
		}
	);
}

function updateEventById(req, res) {
	Event.findOne({ _id: req.swagger.params.id.value }, function(err, event) {
		if (err || !event) { return res.send(404, { message: "Not found" }); }
		else {
			Event.findByIdAndUpdate(
				req.swagger.params.id.value,
				{ $set: req.body },
				function (error, evt) {
					if (error) { return res.send(400, { message: error }); }
					else { return res.send(200, evt); }
				}
			);
		}
	});
}

function deleteEventById(req, res) {
	Event.findOne({ _id: req.swagger.params.id.value }, function (err, event) {
		if(err || !event) { return res.send(404, { message: 'Event not found' }); }
	}).remove(function (err, event) {
		console.log('hihi')
		if (err) { return res.send(400, { message: 'could not delete event' }); }
		else { return res.send(200, { message: 'removed event: ' + req.swagger.params.id.value }); }
	})
}
