'use strict';

// the yeoman generator.
var yeoman = require('yeoman-generator');
var glob = require('glob');
var path = require('path');
var fs = require('fs');

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
        message: 'What will be the name of your company styles bower component?',
        default: this.appname + '-styles'
      },
      {
        type: 'input',
        name: 'version',
        message: 'What will be the version of your component?',
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
      },
      {
        type: 'input',
        name: 'whitelabel',
        message: 'What will be your default whitelabel [a-zA-Z0-9]+ ?',
        default: 'whitelabel'
      }
    ];
    // start the dialog with the user.
    this.prompt(prompts, function (choices) {
      // assign the user's choises to the generator's model.
      this.yeoman.choices = choices;
      // make sure the whitelabel is in the correct format.
      this.yeoman.choices.whitelabel = this.yeoman.choices.whitelabel.replace(/[^a-z0-9]+/gi, "");
      this.yeoman.choices.whitelabel = this.yeoman.choices.whitelabel !== '' ? this.yeoman.choices.whitelabel : 'whitelabel';
      // indicate that the dialog with the user has been finished.
      done();
    }.bind(this));
  },

  // start writing the transformed templates.
  writing: {
    app: function () {
      // create the done handler.
      var done = this.async();
      // set the current directory to get relative paths and nodir to exclude directories only.
      var options = {
        cwd: this.templatePath().replace(/\\/g, "/"),
        nodir: true
      };
      // process all templates.
      glob.glob('**/*', options, function (er, files) {
        for (var i in files) {
          console.log(files[i]);
          // all other files can be processed with the standard ejs delimiter.
          this.fs.copyTpl(
            this.templatePath(files[i]),
            this.destinationPath(this.yeoman.choices.name + '/' + files[i]
                .replace('whitelabel.less', this.yeoman.choices.whitelabel + '.less')
                .replace('bootstrap.whitelabel', 'bootstrap.' + this.yeoman.choices.whitelabel)),
            this
          );
        }
        // indicate that the dialog with the user has been finished.
        done();
      }.bind(this));
    }
  },

  // start the installation process after writing the transformed templates has finished.
  install: function () {
    // change the current directory to install the dependencies.
    // var dir = path.join(process.cwd(), this.yeoman.choices.name);
    // process.chdir(dir);
    // install npm and bower dependencies for the generated website.
    // this.installDependencies();
  }
});
