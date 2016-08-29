

module.exports = function (server) {

	function send403(req, res, err, callback) {
	  console.log('Forbidden');
	  return callback();
	}

	server.on('Forbidden', send403);
}