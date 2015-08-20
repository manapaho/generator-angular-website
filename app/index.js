'use strict';

// the yeoman generator.
var yeoman = require('yeoman-generator');

// export our generator.
module.exports = yeoman.generators.Base.extend({

  // initialize our generator.
  initializing: function () {
    // read the package.json file.
    this.pkg = require('../package.json');
    // initialize the generator's model.
    this.yeoman = {};
  },

  // setup the dialog with the user.
  prompting: function () {
    // create the done handler.
    var done = this.async();
    // create the prompts in order of appearance.
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
        default: function (answers) {
          return 'https:/github.com/' + answers.name;
        }
      }
    ];
    // start the dialog with the user.
    this.prompt(prompts, function (choices) {
      // assign the user's choises to the generator's model.
      this.yeoman.choices = choices;
      // indicate that the dialog with the user has been finished.
      done();
    }.bind(this));
  },

  // start writing the transformed templates.
  writing: {
    app: function () {
      // transform the ./templates into the user's current directory.
      this.directory('.', '.');
    }
  },

  // start the installation process after writing the transformed templates has finished.
  install: function () {
    // install npm and bower dependencies for the generated website.
    this.installDependencies();
  }
});
