var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');
var parseServerConfig = require('parse-server-azure-config');
var url = require('url');

var config = parseServerConfig(__dirname);

// Modify config as necessary before initializing parse server & dashboard

var app = express();

var api = new ParseServer({
  databaseURI: 'mongodb://ourpro:choi119%21@ds052819.mlab.com:52819/sgsampletest', // Connection string for your MongoDB database
  cloud: '/cloud/main.js', // Absolute path to your Cloud Code
  appId: 'myAppSG',
  masterKey: 'SERVICEGENIUS', // Keep this key secret!
  fileKey: 'optionalFileKey',
  serverURL: 'http://parse-on-sg.azurewebsites.net/parse' // Don't forget to change to https if needed
});

app.use('/public', express.static(__dirname + '/public'));
app.use('/parse', new ParseServer(config.server));
app.use('/parse-dashboard', ParseDashboard(config.dashboard, true));

app.listen(process.env.PORT || url.parse(config.server.serverURL).port, function () {
  console.log(`Parse Server running at ${config.server.serverURL}`);
});