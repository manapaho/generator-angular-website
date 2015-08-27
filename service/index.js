'use strict';

// the yeoman generator.
var yeoman = require('yeoman-generator');
var glob = require("glob");
var path = require("path");
var fs = require("fs");

// Helper functions.
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

String.prototype.trim = function(){
  return this.replace(/^\s+|\s+$/g, "");
};
String.prototype.toCamel = function(){
  return this.replace(/(\-[a-z])/g, function($1){return $1.toUpperCase().replace('-','');});
};
String.prototype.toDash = function(){
  return this.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();});
};
String.prototype.toUnderscore = function(){
  return this.replace(/([A-Z])/g, function($1){return "_"+$1.toLowerCase();});
};
String.prototype.splice = function (index,
                                    howManyToDelete,
                                    stringToInsert /* [, ... N-1, N] */) {
  // Create a character array out of the current string
  // by splitting it. In the context of this prototype
  // method, THIS refers to the current string value
  // being spliced.
  var characterArray = this.split("");
  // Now, let's splice the given strings (stringToInsert)
  // into this character array. It won't matter that we
  // are mix-n-matching character data and string data as
  // it will utlimately be joined back into one value.
  //
  // NOTE: Because splice() mutates the actual array (and
  // returns the removed values), we need to apply it to
  // an existing array to which we have an existing
  // reference.
  Array.prototype.splice.apply(
    characterArray,
    arguments
  );
  // To return the new string, join the character array
  // back into a single string value.
  return (
    characterArray.join("")
  );
};

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
    // warn about the current directory.
    this.log('YOU NEED TO BE IN THE ROOT FOLDER OF YOUR WEBSITE !!!');
    // create the done handler.
    var done = this.async();
    // create the prompts in order of appearance.
    var prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Service name in camelCase?',
        default: 'localStorage'
      },
      {
        type: 'input',
        name: 'feature',
        message: 'Feature name in camelCase?',
        default: 'myNewFeature'
      },
      {
        type: 'input',
        name: 'module',
        message: 'Module name?',
        default: function (answers) {
          return 'app.' + answers.feature;
        }
      },
      {
        type: 'input',
        name: 'outputDir',
        message: 'Output path?',
        default: function (answers) {
          return 'app/' + answers.feature;
        }
      }
    ];
    // start the dialog with the user.
    this.prompt(prompts, function (choices) {
      // assign the user's choises to the generator's model.
      this.yeoman.choices = choices;
      this.yeoman.choices.Name = capitalizeFirstLetter(this.yeoman.choices.name);
      this.yeoman.choices.Feature = capitalizeFirstLetter(this.yeoman.choices.feature);
      this.yeoman.choices.featureDash = this.yeoman.choices.feature.toDash();
      // indicate that the dialog with the user has been finished.
      done();
    }.bind(this));
  },
  // start writing the transformed templates.
  writing: {
    app: function () {
      // create the done handler.
      var done = this.async();
      // create the output directory.
      var outdir = this.destinationPath('client/' + this.yeoman.choices.outputDir);
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
            outdir + '/' + files[i]
              .replace('feature', this.yeoman.choices.feature)
              .replace('name.service', this.yeoman.choices.name + '.service'),
            this
          );
        }
        // indicate that the dialog with the user has been finished.
        done();
      }.bind(this));
    }
  }
});

