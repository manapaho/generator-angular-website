/**
 * This is the web-site server entry-point.
 */
/* jslint node: true */
'use strict';

/**
 * External dependencies.
 */
var bodyParser = require('body-parser');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var express = require('express');
var methodOverride = require('method-override');
var morgan = require('morgan');
var multer = require('multer');
var path = require('path');
var serveFavicon = require('serve-favicon');

/**
 * Internal dependencies.
 */
var config = require('./config');

/**
 * Create and configure the web-site application server.
 */
// Create the application.
var app = express();
// Get the current environment.
var env = app.get('env');
// Set the listening port.
app.set('port', config.port);
// Avoid a bug.
app.set('view engine', 'ejs');

/**
 * Add the common middleware.
 */
// Compress every response.
app.use(compression());
// Static file server configuration.
var staticConfig = {
  index: false
};
// Production environment.
if (env === 'production') {
  // Serve the favicon.
  app.use(serveFavicon(path.join(config.root, 'public', 'favicon.ico')));
  // Serve static files.
  app.use(express.static(path.join(config.root, 'public'), staticConfig));
  // Set the application path to the public folder.
  app.set('appPath', path.join(config.root, 'public'));
}
// Development environment.
else if (env === 'development' || env === 'test') {
  // Enable live reload.
  app.use(require('connect-livereload')());
  // Serve the favicon.
  app.use(serveFavicon(path.join(config.root, 'client', 'favicon.ico')));
  // Serve static files.
  app.use(express.static(path.join(config.root, '.tmp'), staticConfig));
  app.use(express.static(path.join(config.root, 'client'), staticConfig));
  // Set the application path to the client folder.
  app.set('appPath', path.join(config.root, 'client'));
  // Use logging.
  app.use(morgan('dev'));
}
// Use custom method overriding.
app.use(methodOverride());
// Parse JSON request bodies.
app.use(bodyParser.json({}));
// Parse URL encoded request bodies.
app.use(bodyParser.urlencoded({extended: true}));
// Parse multi-part request bodies.
app.use(multer());
// Parse the cookies.
app.use(cookieParser());

/**
 * Add the routes.
 */
// All undefined asset routes should return a 404.
app.route('/:url(components|bower_components|assets)/*').get(function pageNotFound(req, res) {
  res.status(404);
  res.render('404', function (err) {
    if (err) {
      return res.json({status: 404}, 404);
    }
    res.render('404');
  });
});
// All other routes should redirect to the index.html to support the HTML5 History API and deep linking.
app.route('/*').get(function (req, res) {
  res.sendFile(app.get('appPath') + '/index.html');
});

/**
 * Run the web-site application server.
 */
// Handle errors.
if (env === 'development' || env === 'test') app.use(errorHandler());
// Start listening.
app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
