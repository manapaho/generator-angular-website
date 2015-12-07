/**
 * This script runs after a successfull 'npm install'.
 */

console.log('Starting post-install procedures...')

/**
 * This is a workaround that will enable us to use angular-ui-grid less files.
 * Reference: https://github.com/angular-ui/ui-grid/issues/4173
 */
var fs = require('fs');
var path = require('path');

var targetFile = path.join(__dirname, '../node_modules/angular-ui-grid/less/menu.less');

fs.readFile(targetFile, 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  var result = data.replace(/#ui-grid-twbs\s>\s*/gi, '');

  fs.writeFile(targetFile, result, 'utf8', function (err) {
    if (err) {
      return console.log(err)
    }
  });
});

/**
 * All done.
 */

console.log('Completed post-install procedures.')
