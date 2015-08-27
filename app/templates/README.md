# Overview

This is a template you can fork and clone to develop an AngularJS website with an automated development process.

# Yeoman Generator

Alternatively you can use the Yeoman ``angular-website`` generator to create a new website like this from scratch.

# Features

* John Papa style-guide implementation and structure.
* Structured Whitelabel support.
* Structured Bootstrap support.
* Grunt automation to support the development process with automated compilation and live-reload.
* Grunt automation for unit and e2e testing.
* Grunt automation for building optimized minified production output.

# Getting Started

* Windows Users might want to install [Git Credential](https://chocolatey.org/packages/git-credential-winstore) Store.
  This will prevent you from getting stuck during npm and bower installs that require your username and password.
* Install [NodeJS](https://nodejs.org/)
* Install bower: <code>npm install -g bower</code>
* Install the grunt cli: <code>npm install -g grunt-cli</code>
* Now make sure the web-site folder is the current folder.
* Install the node module dependencies: <code>npm install</code>
* In case there are problems while installing dependencies you can clean the repository caches: <code>npm cache clear</code>
* Sometimes company proxies can cause issues with GIT. A possible fix could be: <code>git config --global url."https://".insteadOf git://</code>
* Install the bower dependencies: <code>bower install</code>
* In case there are problems while installing dependencies you can clean the repository caches: <code>bower cache clean</code>

# Start developing

Use your IDE or run the serve-dev grunt task manually: <code>grunt serve-dev</code> or <code>grunt serve-dev --whitelabel=myWhitelabelName</code>

<p>This will build your development environment, run all tests, start the development server and open the site in a browser.</p>
<p>You can now start editing the project. Your browser will reload the site automatically whenever you save any changes.</p>

# Test production

Use your IDE or run the serve-prod grunt task manually: <code>grunt serve-prod</code> or <code>grunt serve-prod --whitelabel=myWhitelabelName</code>

<p>This will build your production environment, run all tests, start the development server and open the site in a browser.</p>
<p>You can inspect the site in your browsers development tools to make sure it is using the minified and versioned sources.</p>

# Build production

Use your IDE or run the build-prod grunt task manually: <code>grunt build-prod</code> or <code>grunt build-prod --whitelabel=myWhitelabelName</code>

<p>This will build your production environment, run all tests.</p>
<p>You can now deploy the dist directory to your production infrastructure.</p>

# Contribution

You are very welcome to report issues and to contribute to the project.
