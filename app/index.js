'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
    this.yeoman = {};
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the extraordinary ' + chalk.red('WebsiteGenerator') + ' generator 2.0.5!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'What will be the name of your website project?',
        default: this.appname
      },
      {
        type: 'input',
        name: 'version',
        message: 'What will be the version of your website project?',
        default: '0.0.1'
      },
      {
        type: 'input',
        name: 'description',
        message: 'Please give a description for your website project?',
        default: ''
      },
      {
        type: 'input',
        name: 'author',
        message: 'Who is the author of your website project?',
        default: ''
      },
      {
        type: 'input',
        name: 'email',
        message: 'What is the author\'s email?',
        default: ''
      },
      {
        type: 'input',
        name: 'homepage',
        message: 'What will be your website project\'s homepage?',
        default: 'https:/github.com/' + this.appname
      },
    ];

    this.prompt(prompts, function (choices) {
      this.yeoman.choices = choices;
      // To access props later use this.yeoman.choices.someOption;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      console.log(this.sourceRoot());
      console.log(this.destinationRoot());
      this.directory('.', '.');
    }
  },

  install: function () {
    this.installDependencies();
  }
});
