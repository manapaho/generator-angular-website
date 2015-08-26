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

The default Yeoman website template comes with a predefined ``home`` feature. Obviously you want to add more features to your application.
That can be easily done with the following command:

    yo angular-website:feature

Make sure you run this command within the root folder of your website!

## Full Page Feature

A full page feature is pretty much what you expect, a feature that will cover the entire site and is not directly dependent on parent features.

    http://www.company.com/home
    http://www.company.com/users

To create this kind of feature you would answer the Generators questions in this way.

    ? Module name?                  = app.users                 -- app.[feature name]
    ? Feature name in camelCase?    = users
    ? Routing state?                = users                     -- notice that there is no parent state here - this is what makes it a full page feature!
    ? Routing url?                  = /users
    ? Output path?                  = app/users                 -- notice that features should follow the routing location in the projects directory structure.

## Full Page Feature as Logical Child Feature

Logically a full page feature can still be a child of another feature. To clarify this look at these examples.

    http://www.company.com/home/configuration                   -- This is an example of a full page feature that is a logical child of the home feature.
    http://www.company.com/users/4711/settings                  -- This is an example of a full page feature that is a logical child of the users/user feature.

To create this kind of feature you would answer the Generators questions in this way.

    ? Module name?                  = app.users.user.settings   -- app.[feature name] or app.[logical parent(s)].[feature name]
    ? Feature name in camelCase?    = settings
    ? Routing state?                = settings                  -- notice that there is no parent state here - this is what makes it a full page feature!
    ? Routing url?                  = /users/:id/settings       -- notice that we have logical parents in the route - this is what makes it a logical child feature.
    ? Output path?                  = app/users/user/settings   -- notice that even logical child features should follow the routing location in the projects directory structure.

## Partial Child Feature

A Partial Child Feature does not cover the full Website. It is rather embedded in its parent feature's frame. The parent feature will have one or more ui-view elements.
These elements are the insertion points for Partial Child Features.

    http://www.company.com/dashboard/gauges                     -- This location will show the Partial Child Feature "gauges" within the parents ui-view elements.
    http://www.company.com/dashboard/meters                     -- This location will show the Partial Child Feature "meters" within the parents ui-view elements.

To create this kind of feature you would answer the Generators questions in this way.

    ? Module name?                  = app.dashboard.gauges      -- app.[parent(s)].[feature name]
    ? Feature name in camelCase?    = gauges
    ? Routing state?                = dashboard.gauges          -- notice that there is a parent state here - this is what makes it a partial child feature!
    ? Routing url?                  = /gauges                   -- notice that the parent's feature path is not part of the url. It is inherited by the routing state.
    ? Output path?                  = app/dashboard/gauges      -- notice that partial child features should follow the routing location in the projects directory structure.

# Components
...

## develop build status
[![Build Status](https://travis-ci.org/manapaho/generator-angular-website.svg?branch=develop)](https://travis-ci.org/manapaho/generator-angular-website)
