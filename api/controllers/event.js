'use strict';

var Event = require('../../models/Event');


module.exports = {
	listEvents: listEvents,
	createEvent: createEvent,
	getEventById: getEventById
};

function listEvents(req, res) {
	Event.find({}, function (error, doc) {
		if (!error) {
			res.json({ events: doc });
		} else {
			res.json({ error: 'could not list events'});
		}
	});
}

function createEvent(req, res) {
	Event.create(req.body, function(error, doc) {
		if (!error) {
			res.json({ success: 1, description: 'event added' });
		}
		res.json({ success: 2, description: 'could not create event' });
	});
}

function getEventById(req, res) {
	Event.findOne({ _id: req.swagger.params.id.value }, function (error, doc) {
		if(!error && doc) {
			res.json({
				_id: doc._id,
				title: doc.title,
				description: doc.description,
				limit: doc.limit
			});
		} else {
			res.json({ id: 'could not find event' })
		}
	});
}
