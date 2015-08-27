/**
 * This is the default environment configuration.
 */
/* jslint node: true */
'use strict';

/**
 * External dependencies.
 */
var path = require('path');
var _ = require('lodash');

/**
 * Set the default node environment to development.
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * The default configurations.
 */
var all = {
  /**
   * The node environment.
   */
  env: process.env.NODE_ENV,

  /**
   * Root path of the server.
   */
  root: path.normalize(__dirname + '/../..'),

  /**
   * The Server port.
   */
  port: process.env.PORT || 9000,

  /**
   * The Authorization server's location, port number, and the token info end point.
   */
  authorization: {
    host: "localhost",
    port: "3000",
    url: "https://localhost:3000/",
    tokenURL: "oauth/token",
    authorizeURL: "https://localhost:3000/dialog/authorize",
    tokeninfoURL: "https://localhost:3000/api/tokeninfo?access_token=",
    redirectURL: "https://localhost:9000/authorization/accesscode"
  }
};

/**
 * Export the config object based on the NODE_ENV.
 */
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {}
);
