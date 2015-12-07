'use strict';

// the yeoman generator.
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
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
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the extraordinary ' + chalk.red('WebsiteGenerator') + ' generator 2.0.2!'
    ));
    // create the prompts in order of appearance.
    var prompts = [
      {
        type: 'input',
        name: 'feature',
        message: 'Feature name in camelCase?',
        default: 'myNewFeature'
      },
      {
        type: 'input',
        name: 'state',
        message: 'Routing state?',
        default: function (answers) {
          return answers.feature;
        }
      },
      {
        type: 'input',
        name: 'url',
        message: 'Routing url?',
        default: function (answers) {
          return '/' + answers.feature;
        }
      },
      {
        type: 'input',
        name: 'outputDir',
        message: 'Output path?',
        default: function (answers) {
          return 'src/' + answers.feature;
        }
      },
      {
        type: 'input',
        name: 'whitelabel',
        message: 'What is your default whitelabel [a-zA-Z0-9]+ ?',
        default: 'whitelabel'
      }
    ];
    // start the dialog with the user.
    this.prompt(prompts, function (choices) {
      // assign the user's choises to the generator's model.
      this.yeoman.choices = choices;
      this.yeoman.choices.Feature = capitalizeFirstLetter(this.yeoman.choices.feature);
      this.yeoman.choices.featureDash = this.yeoman.choices.feature.toDash();
      // make sure the whitelabel is in the correct format.
      this.yeoman.choices.whitelabel = this.yeoman.choices.whitelabel.replace(/[^a-z0-9]+/gi, "");
      this.yeoman.choices.whitelabel = this.yeoman.choices.whitelabel !== '' ? this.yeoman.choices.whitelabel : 'whitelabel';
      this.yeoman.choices.Whitelabel = capitalizeFirstLetter(this.yeoman.choices.whitelabel);
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
      var outdir = this.destinationPath(this.yeoman.choices.outputDir);
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
              .replace('whitelabel.less', this.yeoman.choices.whitelabel + '.less')
              .replace('bootstrap.whitelabel', 'bootstrap.' + this.yeoman.choices.whitelabel),
            this
          );
        }
        // This is that is what?
        var self = this;
        // Inject the new feature module.
        this.fs.copy('src/app.module.js', 'src/app.module.js', {
          process: function (contents) {
            /* any modification goes here. note that contents is a Buffer object */
            var newContent = "" + contents.toString() + "";
            // import feature from './feature/feature.module.js';\n
            var index = newContent.indexOf('// yeoman:inject:feature');
            while (newContent[index] !== ';') {
              index--;
            }
            newContent = newContent.splice(index + 1, 0, '\nimport ' + self.yeoman.choices.feature + ' from \'./'  + self.yeoman.choices.feature + '/' + self.yeoman.choices.feature + '.module.js\';');
            // ,\n feature
            index = newContent.indexOf('// yeoman:inject:feature');
            index = newContent.indexOf('// yeoman:inject:feature', index + 24) - 1;
            while (/\s/.test(newContent[index])) {
              index--;
            }
            return newContent.splice(index + 1, 0, ',\n  ' + self.yeoman.choices.feature);
          }
        });
        // Inject the new feature less.
        this.fs.copy('src/app.less', 'src/app.less', {
          process: function (contents) {
            /* any modification goes here. note that contents is a Buffer object */
            var newContent = "" + contents.toString() + "";
            var index = newContent.indexOf('/* yeoman:inject:feature */');
            while (newContent[index] !== ';') {
              index--;
            }
            return newContent.splice(index + 1, 0, '\n@import \'./' + self.yeoman.choices.feature + '/' + self.yeoman.choices.feature + '.less\';');
          }
        });
        // Inject the new whitelabel feature less.
        this.fs.copy('src/app.' + self.yeoman.choices.whitelabel + '.less', 'src/app.' + self.yeoman.choices.whitelabel + '.less', {
          process: function (contents) {
            /* any modification goes here. note that contents is a Buffer object */
            var newContent = "" + contents.toString() + "";
            var index = newContent.indexOf('/* yeoman:inject:feature */');
            while (newContent[index] !== ';') {
              index--;
            }
            return newContent.splice(index + 1, 0, '\n@import \'./' + self.yeoman.choices.feature + '/' + self.yeoman.choices.feature + '.' + self.yeoman.choices.whitelabel + '.less\';');
          }
        });
        // indicate that the dialog with the user has been finished.
        done();
      }.bind(this));
    }
  }

  //install: function () {
  //  //
  //  var outpath = this.destinationPath('client/' + this.yeoman.choices.outputDir);
  //  var feature = this.yeoman.choices.feature;
  //  glob(outpath + "/*.*", function (err, files) {
  //    var processed = 0;
  //    files.forEach(function (file) {
  //      var dir = path.dirname(file);
  //      var filename = path.basename(file).replace('feature', feature);
  //      fs.renameSync(file, dir + "/" + filename);
  //      processed++;
  //    });
  //    console.log(processed + " files processed");
  //  });
  //}
});
