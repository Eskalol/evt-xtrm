var mongoose = require('mongoose');

// TODO: fix connection url from environment
module.exports = mongoose.createConnection(process.env.MONGO_URL || 'mongodb://test:test@localhost/evt-xtrm-db');
