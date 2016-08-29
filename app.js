'use strict';
var SwaggerRestify = require('swagger-restify-mw');
var restify = require('restify');
var server = restify.createServer();
var permission = require('./auth/permission');

module.exports = server; // for testing


require('./auth/handleError')(server);
require('./auth/auth')(server, 'key-board-cat');

//facebook config
var facebook_config = {
  clientID: "1739022963015334",
  clientSecret: "1d4c2705545295207cc2257ccaa7b243"
}
//facebook passport
require('./auth/facebook')(server, facebook_config);


server.use(permission.permissionSecurity());


var config = {
  appRoot: __dirname // required config
};

SwaggerRestify.create(config, function(err, swaggerRestify) {
  if (err) { throw err; }

  swaggerRestify.register(server);

  var port = process.env.PORT || 10010;
  server.listen(port);

});
