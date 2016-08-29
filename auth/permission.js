var restify = require('restify');

module.exports = {
	permissionSecurity: function () {
		return 	function (req, res, next) {
			if (req.url.match(/^\/api\/event$/) && req.method == 'GET') {
				return next();
			}
			if (req.url.match(/^\/api\/event\/(\d+)$/) && req.method == 'GET') {
				return next();
			}
			if (req.user && req.url.match(/^\/api\/participant\/(\d+)$/) && req.method == 'POST' && req.user.permission == 'standard') {
				return next();
			}
			
			if (req.user && req.user.permission == 'admin' ) return next();
			return next(new restify.ForbiddenError());
		};
	}
};
