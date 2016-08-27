var mongoose = require('mongoose');

// TODO: fix connection url from environment
module.exports = mongoose.createConnection('mongodb://root:root@ds015636.mlab.com:15636/heroku_5pvfhc6r');
