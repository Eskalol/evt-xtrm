Evt-xtrm
============
[![Build Status](https://travis-ci.org/Eskalol/evt-xtrm.svg?branch=master)](https://travis-ci.org/Eskalol/evt-xtrm)[![Dependencies](https://david-dm.org/Eskalol/evt-xtrm.svg)](https://david-dm.org/Eskalol/evt-xtrm)[![Dev Dependencies](https://david-dm.org/Eskalol/evt-xtrm/dev-status.svg)](https://david-dm.org/Eskalol/evt-xtrm?type=dev)


# Install evt-xtrm module
```{r, engine='bash', count_lines}
$ npm install evt-xtrm --save
```
# Create your database
You can use a local database or external such as mlab.com.

## Local MongoDB
1. Install mongodb https://docs.mongodb.com/v3.0/administration/install-on-linux/
2. create db user
```{r, engine='bash', count_lines}
$ mongo evt-xtrm-db --eval 'db.createUser({user: "test", pwd: "test", roles: [ { role: "readWrite", db: "config" } ]});'
```

## External MongoDB
Just export your connection url to environment
```{r, engine='bash', count_lines}
$ export MONGO_URL=[your mongodb url]
```
# Set up your server
```js
server = require('evt-xtrm')({
	passport: {
		enable: true,
		permissionSecurity: true,
		secret: [your secret for passport],
		facebook: {
			enable: truem
			AppID: [app id], //Option could be set in environment
			AppSecret: [app secret] //Optional could be set in environment
		},
		baseUrl: [Base url] //Optional is localhost by default.
	}
});
// then use your server!
server.get(...
```

# Environment variables
Here is a list of environment variables you could set
```{r, engine='bash', count_lines}
$ export PORT=[Port to listen on]
$ export FACEBOOK_APPID=[AppID]
$ export FACEBOOK_APPSECRET=[AppSecret]
```
# How to obtain facebook App ID and Secret
Create a new app on https://developers.facebook.com/.
Remember to set on your Site URL(http://localhost:10010 for dev)


How to contribute
====================
```{r, engine='bash', count_lines}
$ git clone https://github.com/Eskalol/evt-xtrm.git
$ cd evt-xtrm
$ npm install -g swagger
$ npm install
```

Run swagger and swagger browser:
```{r, engine='bash', count_lines}
$ swagger project start
$ swagger project edit
```
Check the issue tracker.

## Tips
1. When playing with swagger it's recomended to use these settings:
```js
require('evt-xtrm')({
	passport: {
		enable: true,
		permissionSecurity: false,
		...
	}
});

```
Rest of the settings is optional. The reason why permissionSecurity should be set to false is because we are using a custom middleware which is not integrated with swagger. This is just a temporary solution and will be fixed when swagger implement cookie session auth.
