var mongoose = require('mongoose');

// TODO: fix connection url from environment
// //'mongodb://root:root@ds015636.mlab.com:15636/heroku_5pvfhc6r'
module.exports = mongoose.createConnection(process.env.MONGO_URL || 'mongodb://test:test@localhost/evt-xtrm-db');
