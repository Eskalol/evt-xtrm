'use strict';

var models = require('../../db/models');


module.exports = {
	listEvents: listEvents,
	createEvent: createEvent,
	getEventById: getEventById
};

function listEvents(req, res) {
	
	models.event.find({}, function (error, doc) {
		if (!error) {
			res.json({ events: doc });
		}
		res.json({events: models.event});
	});
}

function createEvent(req, res) {

	models.event.create(req.body, function(error, doc) {
		if (!error) {
			console.log(doc._id);
			res.json({ success: 1, description: 'event added' });
		}
		res.json({ success: 2, description: 'could not create event' });
	});
}

function getEventById(req, res) {

	models.event.findOne({ _id: req.swagger.params.id.value }, function (error, doc) {
		if(!error && doc) {
			res.json(doc);
		} else {
			res.json({ id: 'could not find event' })
		}
	});
}

