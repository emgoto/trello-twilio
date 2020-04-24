var dotenv = require('dotenv');
var cfg = {};

if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  dotenv.config({path: '.env'});
} else {
  dotenv.config({path: '.env.example', silent: true});
}

// HTTP Port to run our web application
cfg.port = process.env.PORT || 3000;

// A random string that will help generate secure one-time passwords and
// HTTP sessions
cfg.secret = process.env.APP_SECRET || 'keyboard cat';

// Your Twilio account SID and auth token, both found at:
// https://www.twilio.com/user/account
//
// A good practice is to store these string values as system environment
// variables, and load them from there as we are doing below. Alternately,
// you could hard code these values here as strings.
cfg.accountSid = process.env.TWILIO_ACCOUNT_SID;
cfg.authToken = process.env.TWILIO_AUTH_TOKEN;
cfg.sendingNumber = process.env.TWILIO_NUMBER;
cfg.trelloKey = process.env.TRELLO_KEY;
cfg.trelloAuth = process.env.TRELLO_AUTH_TOKEN;
cfg.trelloBoard = process.env.TRELLO_BOARD;
cfg.serverURL = process.env.SERVER_URL;

var requiredConfig = [cfg.accountSid, cfg.authToken, cfg.sendingNumber, cfg.trelloKey, cfg.trelloAuth, cfg.trelloBoard, cfg.serverURL];
var isConfigured = requiredConfig.every(function(configValue) {
  return configValue || false;
});

if (!isConfigured) {
  var errorMessage =
    'All 6 .env variables must be set.';

  throw new Error(errorMessage);
}

// Export configuration object
module.exports = cfg;
