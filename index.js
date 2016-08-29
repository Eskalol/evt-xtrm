var SwaggerRestify = require('swagger-restify-mw');
var restify = require('restify');
var server = restify.createServer();
var permission = require('./auth/permission');


/**
 * Initialize 
 * @param  {object} config
 *         	{
 *         		passport:
 *         		{
 *         			enable: true/false,
 *         			permissionSecurity: true/false,
 *         			secret: key-board-cat,
 *         			facebook:
 *         			{	
 *         				enable: true/false,
 *         				AppID: AppID,
 *         				AppSecret: App Secret
 *         			}
 *         		},
 *         		baseUrl: base url,
 *         	}
 * 
 * @return {server}        restify server is returned
 */
module.exports = function (config) {

	if (config.passport.enable) {
		require('./auth/handleError')(server);
		require('./auth/auth')(server, config.passport.secret || 'key-board-cat');

		if(config.passport.facebook.enable) {
			require('./auth/facebook')(server,
			{
				clientID: process.env.FACEBOOK_APPID || config.passport.facebook.AppID,
				ClientSecret: process.env.FACEBOOK_APPSECRET || config.passport.AppSecret,
			},
			config.baseUrl || "http://localhost:" + (process.env.PORT || 10010));
		}

		if(config.passport.permissionSecurity) {
			server.use(permission.permissionSecurity());
		}
	}


	var conf = {
  		appRoot: __dirname // required config
	};

	SwaggerRestify.create(conf, function(err, swaggerRestify) {
	  if (err) { throw err; }

	  swaggerRestify.register(server);

	  var port = process.env.PORT || 10010;
	  server.listen(port);

	});

	return server;
};