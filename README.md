# generator-angular-website
A yeoman generator to scaffold angular based websites, features and components.

# Overview
This generator can create an opinionated AngularJS web application. Not only a single website but rather a set of
components that make up a complete enterprise scale web application solution made up of the following parts:

- A styles bower component that holds all styles across all applications and white-labels for your organization.
- An assets bower component that holds all assets across all applications and white-labels for your organization.
- An opinionated feature centric core web application following John Papa's style-guide.
- An opinionated features template following John Papa's style-guide.

# Goal
The goal is to enable large even distributed teams to collaborate easily on a web application that scales and supports
automated continues delivery. This is achived by:

- vertical development and having lots of components rather than a monolithic blob.
- a commitment to versioned component dependencies via Git Release Tags and bower.
- a commitment to typical Git development flows with feature branches and pull-requests.
- a feature centric approach that keeps all parts of a feature together in one place.
- a well defined hierarchical styles structure with a commitment to bootstrap themes.
- an API driven approach with client data-services as raw data sources.
- a fully automated development process via Grunt.
- a fully automated build and deployment process via Travis.

# Prerequisites

First of all you need to install [NodeJS](http://nodejs.org)

The next point is important if you need authentication to access private components of GitHub. Open a Git Shell and
store your user credentials:

    git config --global credentials.helper store

Now install the bower package manager:

    npm install -g bower

Then install the grunt cli:

    npm install -g grunt-cli

Finally install the yeoman and this angular website generator:

    npm install -g yo
    npm install -g generator-angular-website

# Usage

Now that you have setup your system you can use this generator.

Before we create the core web application we have to make sure we have the necessary dependencies in place.

## company-styles

If you haven't already create it you first have to create your companies styles component.
This is basically a Git repository and a bower component that holds all your company styles
across all applications and whitelabels.

To create it run the following command and answer all questions truthfully:

    yo angular-website:styles

We recommend to name your component like ``company-styles`` and your whitelabels short and simple like ``mastercard``.

After having created your company styles you should create a Git repository with the same name for it and check it in to GitHub.

Alternatively while you develop locally you can use the following command in your company styles component folder:

    bower link

This will create a sym link to this bower component which we can use later to link the web application to it.

## website

Now we are ready to create the core website:

    yo angular-website

Make sure you enter the correct name of your company styles component and the default whitelabel.

We recommend that you name your website like ``company-website``.

After the successful creation of your website the generator will trigger the installation of all npm and bower dependencies.

This might fail if you haven't registered the company styles repository and bower component yet. In this case you simply
link your local company styles by running the following command within your company website's folder:

    bower link company-styles

Obviously you have to replace ``company-styles`` with the name you have chosen for your company styles component.

## Start development

The development process is fully automated and even supports live-reload of your browser whenever you make changes to your website.

To start development and run the website in your browser simply run:

    grunt serve-dev

This will serve your website and the default white-label.

Once you have got more white-labels you can select the one you are working on with a grunt option:

    grunt serve-dev --whitelabel:visa

## Build the minified production release

The production output is very different from the development output. Basically it is compressed JavaScript and StyleSheets in fewer files.

To build this run:

    grunt build-prod

or

    grunt build-prod --whitelabel:visa

to target a particular whitelabel.

## Serve the production code locally to make sure it works

From time to time you want to make sure that your production code works as expected. To do that you can serve it locally:

    grunt serve-prod

or

    grunt serve-prod --whitelabel:visa

to target a particular whitelabel.

# Features
...

# Components
...

## develop build status
[![Build Status](https://travis-ci.org/manapaho/generator-angular-website.svg?branch=develop)](https://travis-ci.org/manapaho/generator-angular-website)
