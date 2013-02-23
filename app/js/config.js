define([], function () {
  var config = {};
  config.apiKey = 'AIzaSyCUGJAwwNSwG5Fwn3dVZVwyFvkhIHjrP4Y';
  config.scopes = 'https://www.googleapis.com/auth/tasks https://www.googleapis.com/auth/userinfo.profile';
  config.clientId = '1065820464686-ictocu6acrrlc27g50d6eukh05h9nb5e.apps.googleusercontent.com';

  _.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
  };

  return config;
});