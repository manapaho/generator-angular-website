# Overview

This is a template you can fork and clone to develop an AngularJS website with an automated development process.

# Features
* John Papa style-guide implementation and structure.
* Structured Whitelabel support using `whitelabel-styles` and `whitelabel-assets`.
* Structured Bootstrap support using an upgradable theme approach.
* Heavily commented webpack configuration with reasonable defaults.
* ES6, and ES7 support with babel.js.
* Source maps included in all builds.
* Development server with live reload.
* Production builds with cache busting and asset minification.
* Testing environment using karma to run tests and jasmine as the framework.
* Code coverage when tests are run.
* No gulp and no grunt, just npm run-scripts.

# Getting Started

* Windows Users might want to install [Git Credential](https://chocolatey.org/packages/git-credential-winstore) Store.
  This will prevent you from getting stuck during npm installs that require your username and password.
* Install [NodeJS](https://nodejs.org/)
* Now make sure the web-site folder is the current folder.
* Install the node module dependencies: <code>npm install</code>
* In case there are problems while installing dependencies you can clean the repository caches: <code>npm cache clear</code>
* Sometimes company proxies can cause issues with GIT. A possible fix could be: <code>git config --global url."https://".insteadOf git://</code>

## Scripts

All scripts are run with `npm run [script]`, for example: `npm run test`.

* `build` - generate a minified build to dist folder
* `dev` - start development server, try it by opening `http://localhost:8080/`
* `test` - run all tests
* `test:live` - continuously run unit tests watching for changes

See what each script does by looking at the `scripts` section in [package.json](./package.json).

# Start developing

Use your IDE or run the dev task manually: <code>npm run dev</code>

<p>This will build your development environment, run all tests, start the development server and open the site in a browser.</p>
<p>You can now start editing the project. Your browser will reload the site automatically whenever you save any changes.</p>

# Run tests

Use your IDE or run the test task manually: <code>npm run test</code>

<p>This will run all tests automatically and create a test and coverage report in the build folder.</p>

# Debug tests

Use your IDE or run the test task manually: <code>npm run test:live</code>

<p>This will run all tests and keep the test server open. You can now use the your browsers developer tools to debug your tests.</p>

# Build production

Use your IDE or run the build task manually: <code>npm run build</code>

<p>This will build your production environment, run all tests.</p>
<p>You can now deploy the dist directory to your production infrastructure.</p>

# Contribution

You are very welcome to report issues and to contribute to the project.
