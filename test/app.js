'use strict';
var fs = require('fs');
var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var mockery = require('mockery');

describe('generator:app', function () {
  before(function () {
    mockery.enable({warnOnUnregistered: false});
    mockery.registerMock('github', function () {
      return {
        user: {
          getFrom: function (data, cb) {
            cb(null, JSON.stringify({
              name: 'Tyrion Lannister',
              email: 'imp@casterlyrock.com',
              html_url: 'https://github.com/imp'
            }));
          }
        }
      };
    });

    mockery.registerMock('superb', function () {
      return 'cat\'s meow';
    });

    mockery.registerMock('npm-name', function (name, fn) {
      fn(null, true);
    });
  });

  after(function () {
    mockery.disable();
  });

  describe('defaults', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .withPrompts({
          companyStyles: true,
          companyStylesName: 'company-styles',
          companyStylesVersion: '~0.0.1',
          name: 'company-website',
          version: '0.0.1',
          description: 'description',
          author: 'author',
          email: 'email',
          homepage: 'homepage',
          whitelabel: 'company'
        })
        .on('end', done);
    });

    it('creates files', function () {
      var expected = [
        '.bowerrc'
        , '.editorconfig'
        , '.gitignore'
        , 'bower.json'
        , 'client/.jshintrc'
        , 'client/app/_app.bootstrap.company/bootstrap.less'
        , 'client/app/_app.bootstrap.company/variables.less'
        , 'client/app/_app.bootstrap/bootstrap.less'
        , 'client/app/_app.bootstrap/variables.less'
        , 'client/app/app.config.js'
        , 'client/app/app.core.module.js'
        , 'client/app/app.core.service.js'
        , 'client/app/app.less'
        , 'client/app/app.module.js'
        , 'client/app/app.route.js'
        , 'client/app/app.run.js'
        , 'client/app/app.company.less'
        , 'client/app/home/_home.bootstrap.company/bootstrap.less'
        , 'client/app/home/_home.bootstrap.company/variables.less'
        , 'client/app/home/_home.bootstrap/bootstrap.less'
        , 'client/app/home/_home.bootstrap/variables.less'
        , 'client/app/home/home.config.js'
        , 'client/app/home/home.controller.js'
        , 'client/app/home/home.controller.spec.js'
        , 'client/app/home/home.data.service.js'
        , 'client/app/home/home.html'
        , 'client/app/home/home.less'
        , 'client/app/home/home.module.js'
        , 'client/app/home/home.route.js'
        , 'client/app/home/home.service.js'
        , 'client/app/home/home.company.less'
        , 'client/assets/fonts/angular-ui-grid/ui-grid.eot'
        , 'client/assets/fonts/angular-ui-grid/ui-grid.svg'
        , 'client/assets/fonts/angular-ui-grid/ui-grid.ttf'
        , 'client/assets/fonts/angular-ui-grid/ui-grid.woff'
        , 'client/assets/fonts/bootstrap/fonts/glyphicons-halflings-regular.eot'
        , 'client/assets/fonts/bootstrap/fonts/glyphicons-halflings-regular.svg'
        , 'client/assets/fonts/bootstrap/fonts/glyphicons-halflings-regular.ttf'
        , 'client/assets/fonts/bootstrap/fonts/glyphicons-halflings-regular.woff'
        , 'client/assets/fonts/bootstrap/fonts/glyphicons-halflings-regular.woff2'
        , 'client/assets/fonts/icomoon/demo-files/demo.css'
        , 'client/assets/fonts/icomoon/demo-files/demo.js'
        , 'client/assets/fonts/icomoon/demo.html'
        , 'client/assets/fonts/icomoon/fonts/icomoon.eot'
        , 'client/assets/fonts/icomoon/fonts/icomoon.svg'
        , 'client/assets/fonts/icomoon/fonts/icomoon.ttf'
        , 'client/assets/fonts/icomoon/fonts/icomoon.woff'
        , 'client/assets/fonts/icomoon/Read Me.txt'
        , 'client/assets/fonts/icomoon/selection.json'
        , 'client/assets/fonts/icomoon/style.css'
        , 'client/assets/fonts/icomoon/style.less'
        , 'client/assets/fonts/open-sans/OpenSans-Bold-webfont.eot'
        , 'client/assets/fonts/open-sans/OpenSans-Bold-webfont.svg'
        , 'client/assets/fonts/open-sans/OpenSans-Bold-webfont.ttf'
        , 'client/assets/fonts/open-sans/OpenSans-Bold-webfont.woff'
        , 'client/assets/fonts/open-sans/OpenSans-BoldItalic-webfont.eot'
        , 'client/assets/fonts/open-sans/OpenSans-BoldItalic-webfont.svg'
        , 'client/assets/fonts/open-sans/OpenSans-BoldItalic-webfont.ttf'
        , 'client/assets/fonts/open-sans/OpenSans-BoldItalic-webfont.woff'
        , 'client/assets/fonts/open-sans/OpenSans-ExtraBold-webfont.eot'
        , 'client/assets/fonts/open-sans/OpenSans-ExtraBold-webfont.svg'
        , 'client/assets/fonts/open-sans/OpenSans-ExtraBold-webfont.ttf'
        , 'client/assets/fonts/open-sans/OpenSans-ExtraBold-webfont.woff'
        , 'client/assets/fonts/open-sans/OpenSans-ExtraBoldItalic-webfont.eot'
        , 'client/assets/fonts/open-sans/OpenSans-ExtraBoldItalic-webfont.svg'
        , 'client/assets/fonts/open-sans/OpenSans-ExtraBoldItalic-webfont.ttf'
        , 'client/assets/fonts/open-sans/OpenSans-ExtraBoldItalic-webfont.woff'
        , 'client/assets/fonts/open-sans/OpenSans-Italic-webfont.eot'
        , 'client/assets/fonts/open-sans/OpenSans-Italic-webfont.svg'
        , 'client/assets/fonts/open-sans/OpenSans-Italic-webfont.ttf'
        , 'client/assets/fonts/open-sans/OpenSans-Italic-webfont.woff'
        , 'client/assets/fonts/open-sans/OpenSans-Light-webfont.eot'
        , 'client/assets/fonts/open-sans/OpenSans-Light-webfont.svg'
        , 'client/assets/fonts/open-sans/OpenSans-Light-webfont.ttf'
        , 'client/assets/fonts/open-sans/OpenSans-Light-webfont.woff'
        , 'client/assets/fonts/open-sans/OpenSans-LightItalic-webfont.eot'
        , 'client/assets/fonts/open-sans/OpenSans-LightItalic-webfont.svg'
        , 'client/assets/fonts/open-sans/OpenSans-LightItalic-webfont.ttf'
        , 'client/assets/fonts/open-sans/OpenSans-LightItalic-webfont.woff'
        , 'client/assets/fonts/open-sans/OpenSans-Regular-webfont.eot'
        , 'client/assets/fonts/open-sans/OpenSans-Regular-webfont.svg'
        , 'client/assets/fonts/open-sans/OpenSans-Regular-webfont.ttf'
        , 'client/assets/fonts/open-sans/OpenSans-Regular-webfont.woff'
        , 'client/assets/fonts/open-sans/OpenSans-Semibold-webfont.eot'
        , 'client/assets/fonts/open-sans/OpenSans-Semibold-webfont.svg'
        , 'client/assets/fonts/open-sans/OpenSans-Semibold-webfont.ttf'
        , 'client/assets/fonts/open-sans/OpenSans-Semibold-webfont.woff'
        , 'client/assets/fonts/open-sans/OpenSans-SemiboldItalic-webfont.eot'
        , 'client/assets/fonts/open-sans/OpenSans-SemiboldItalic-webfont.svg'
        , 'client/assets/fonts/open-sans/OpenSans-SemiboldItalic-webfont.ttf'
        , 'client/assets/fonts/open-sans/OpenSans-SemiboldItalic-webfont.woff'
        , 'client/assets/fonts/open-sans/style.less'
        , 'client/assets/fonts/roboto/Roboto-Black.eot'
        , 'client/assets/fonts/roboto/Roboto-Black.woff2'
        , 'client/assets/fonts/roboto/Roboto-BlackItalic.eot'
        , 'client/assets/fonts/roboto/Roboto-BlackItalic.woff2'
        , 'client/assets/fonts/roboto/Roboto-Bold.eot'
        , 'client/assets/fonts/roboto/Roboto-Bold.woff2'
        , 'client/assets/fonts/roboto/Roboto-BoldItalic.eot'
        , 'client/assets/fonts/roboto/Roboto-BoldItalic.woff2'
        , 'client/assets/fonts/roboto/Roboto-Italic.eot'
        , 'client/assets/fonts/roboto/Roboto-Italic.woff2'
        , 'client/assets/fonts/roboto/Roboto-Light.eot'
        , 'client/assets/fonts/roboto/Roboto-Light.woff2'
        , 'client/assets/fonts/roboto/Roboto-LightItalic.eot'
        , 'client/assets/fonts/roboto/Roboto-LightItalic.woff2'
        , 'client/assets/fonts/roboto/Roboto-Medium.eot'
        , 'client/assets/fonts/roboto/Roboto-Medium.woff2'
        , 'client/assets/fonts/roboto/Roboto-MediumItalic.eot'
        , 'client/assets/fonts/roboto/Roboto-MediumItalic.woff2'
        , 'client/assets/fonts/roboto/Roboto-Regular.eot'
        , 'client/assets/fonts/roboto/Roboto-Regular.woff2'
        , 'client/assets/fonts/roboto/Roboto-Thin.eot'
        , 'client/assets/fonts/roboto/Roboto-Thin.woff2'
        , 'client/assets/fonts/roboto/Roboto-ThinItalic.eot'
        , 'client/assets/fonts/roboto/Roboto-ThinItalic.woff2'
        , 'client/assets/fonts/roboto/style.less'
        , 'client/assets/images/yeoman.png'
        , 'client/assets/translations/de.json'
        , 'client/assets/translations/en.json'
        , 'client/components/example-component/example-component.html'
        , 'client/components/example-component/example-component.js'
        , 'client/components/example-component/example-component.less'
        , 'client/components/example-component/example-component.module.js'
        , 'client/favicon.ico'
        , 'client/icon-120x120.png'
        , 'client/icon-152x152.png'
        , 'client/icon-60x60.png'
        , 'client/icon-76x76.png'
        , 'client/index.html'
        , 'client/robots.txt'
        , 'gruntfile.js'
        , 'karma.conf.js'
        , 'package.json'
        , 'protractor.conf.js'
        , 'README.md'
        , 'server/.jshintrc'
        , 'server/.jshintrc-spec'
        , 'server/app.js'
        , 'server/config/development.js'
        , 'server/config/index.js'
        , 'server/config/production.js'
      ];

      assert.file(expected);
    });

  });
});
