'use strict';

// Export our grunt configuration.
module.exports = function (grunt) {

  // Load grunt tasks automatically, when needed.
  require('jit-grunt')(grunt, {
    bowerInstall: 'grunt-bower-install',
    env: 'grunt-env',
    express: 'grunt-express-server',
    injector: 'grunt-asset-injector',
    ngtemplates: 'grunt-angular-templates',
    protractor: 'grunt-protractor-runner',
    useminPrepare: 'grunt-usemin'
  });

  // Task Options.
  var whitelabel = grunt.option('whitelabel') || '<*= yeoman.choices.whitelabel *>';

  // Used for delaying livereload until after server has restarted.
  grunt.registerTask('wait', function () {
    grunt.log.ok('Waiting for server reload...');

    var done = this.async();

    setTimeout(function () {
      grunt.log.writeln('Done waiting!');
      done();
    }, 1500);
  });

  // Used instead of 'watch' while serving the production environment.
  grunt.registerTask('express-keepalive', 'Keep grunt running', function () {
    this.async();
  });

  // Cleanup all.
  grunt.registerTask('cleanup', [
    'clean:default', 'clean:dist'
    ]);

    // Serve development build.
  grunt.registerTask('serve-dev', [
    // Cleanup generated files.
    'clean:default', 'clean:dist',
    // Create and inject stylesheets.
    'injector:css', 'injector:less', 'less:' + whitelabel, 'autoprefixer',
    // Inject and lint javascript.
    'injector:scripts', 'jshint',
    // Inject bower dependencies and run unit tests.
    'bowerInstall', 'karma',
    // Serve the development website.
    'express:dev', 'open', 'watch'
  ]);

  // Create production build.
  grunt.registerTask('build-prod', [
    // Cleanup generated files.
    'clean:default', 'clean:dist',
    // Create and inject stylesheets.
    'injector:css', 'injector:less', 'less:' + whitelabel, 'autoprefixer',
    // Inject and lint javascript.
    'injector:scripts', 'jshint',
    // Inject bower dependencies and run unit tests.
    'bowerInstall', 'karma',
    // Compress and copy image files to the distribution folder.
    'imagemin', 'svgmin',
    // Create html template cache and compressed and revisioned script and style production files.
    'useminPrepare', 'ngtemplates', 'concat', 'copy:dist', 'cssmin', 'uglify', 'rev', 'usemin'
  ]);

  // Serve production build.
  grunt.registerTask('serve-prod', [
    // Create production build.
    'build-prod',
    // Serve the production website.
    'env:prod', 'express:prod', 'wait', 'open', 'express-keepalive'
  ]);

  // Run all unit tests.
  grunt.registerTask('run-unit-tests', [
    'bowerInstall', 'karma'
  ]);

  // Project configuration.
  grunt.initConfig({

      // Import the package.json.
      pkg: grunt.file.readJSON('package.json'),

      cfg: {
        // configurable paths
        client: require('./bower.json').appPath || 'client',
        dist: 'dist'
      },

      // Empties folders to start fresh.
      clean: {
        css: {
          src: ['<%= cfg.client %>/.css']
        },
        js: {
          src: ['<%= cfg.client %>/.js']
        },
        default: {
          src: [
            '<%= cfg.client %>/.js',
            '<%= cfg.client %>/.css'
          ]
        },
        dist: {
          src: [
            '.dist',
            '<%= cfg.dist %>'
          ]
        }
      },

      //
      // Client
      //

      // Inject dynamic code.
      injector: {
        options: {},
        // Inject application script files into index.html (doesn't include bower)
        scripts: {
          options: {
            sort: function (a, b) {
              var result;
              if (a.indexOf('module.js') >= 0)
                result = -1;
              else if (b.indexOf('module.js') >= 0)
                result = 1;
              else if (a.indexOf('module.js') >= 0 && b.indexOf('module.js') >= 0)
                result = 0;
              else
                result = a.localeCompare(b);
              return result;
            },
            transform: function (filePath) {
              filePath = filePath.replace('/client/', '');
              filePath = filePath.replace('/.tmp/', '');
              return '<script src="' + filePath + '"></script>';
            },
            starttag: '<!-- injector:js -->',
            endtag: '<!-- endinjector -->'
          },
          files: {
            '<%= cfg.client %>/index.html': [
              ['{.tmp,<%= cfg.client %>}/{app,components}/**/*.js',
                '!{.tmp,<%= cfg.client %>}/app/app.module.js',
                '!{.tmp,<%= cfg.client %>}/{app,components}/**/*.spec.js',
                '!{.tmp,<%= cfg.client %>}/{app,components}/**/*.mock.js']
            ]
          }
        },
        // Inject component less into app.less
        less: {
          options: {
            sort: function (a, b) {
              return a.length > b.length;
            },
            transform: function (filePath) {
              filePath = filePath.replace('/' + grunt.config.get('cfg').client + '/app/', '');
              filePath = filePath.replace('/' + grunt.config.get('cfg').client + '/components/', '../components/');
              return '@import \'' + filePath + '\';';
            },
            starttag: '// injector',
            endtag: '// endinjector'
          },
          files: {
            '<%= cfg.client %>/app/app.less': [
              '<%= cfg.client %>/{app,components}/**/*.less',
              '!<%= cfg.client %>/{app,components}/**/_**/*.less',
              '!<%= cfg.client %>/{app,components}/**/*.<*= yeoman.choices.whitelabel *>.less',
              '!<%= cfg.client %>/app/app.less',
              '!<%= cfg.client %>/app/app.*.less'
            ],
            '<%= cfg.client %>/app/app.<*= yeoman.choices.whitelabel *>.less': [
              '<%= cfg.client %>/{app,components}/**/*.<*= yeoman.choices.whitelabel *>.less',
              '!<%= cfg.client %>/{app,components}/**/_**/*.less',
              '!<%= cfg.client %>/app/app.less',
              '!<%= cfg.client %>/app/app.*.less'
            ]
          }
        },
        // Inject component css into index.html
        css: {
          options: {
            transform: function (filePath) {
              filePath = filePath.replace('/' + grunt.config.get('cfg').client + '/', '');
              return '<link rel="stylesheet" href="' + filePath + '">';
            },
            starttag: '<!-- injector:css -->',
            endtag: '<!-- endinjector -->'
          },
          files: {
            '<%= cfg.client %>/index.html': [
              '<%= cfg.client %>/{app,components}/**/*.css'
            ]
          }
        }
      },

      // Compiles Less to CSS.
      less: {
        <*= yeoman.choices.whitelabel *>: {
          files: {
            '<%= cfg.client %>/.css/app/app.css': '<%= cfg.client %>/app/app.<*= yeoman.choices.whitelabel *>.less'
          }
        }
      },

      // Automatically add vendor prefixed styles.
      autoprefixer: {
        options: {
          browsers: ['last 2 version']
        },
        dist: {
          files: [{
            expand: true,
            cwd: '<%= cfg.client %>/.css/',
            src: '{,*/}*.css',
            dest: '<%= cfg.client %>/.css/'
          }]
        }
      },

      // Package all the html partials into a single javascript payload
      ngtemplates: {
        options: {
          // This should be the name of your apps angular module
          module: 'app',
          htmlmin: {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
          },
          usemin: 'app/app.js'
        },
        main: {
          cwd: '<%= cfg.client %>',
          src: ['{app,components}/**/*.html'],
          dest: '<%= cfg.client %>/.js/templates.js'
        }
      },

      // Make sure code styles are up to par and there are no obvious mistakes
      jshint: {
        options: {
          jshintrc: '<%= cfg.client %>/.jshintrc',
          reporter: require('jshint-stylish')
        },
        server: {
          options: {
            jshintrc: 'server/.jshintrc'
          },
          src: [
            'server/**/*.js',
            '!server/**/*.spec.js'
          ]
        },
        serverTest: {
          options: {
            jshintrc: 'server/.jshintrc-spec'
          },
          src: ['server/**/*.spec.js']
        },
        all: [
          '<%= cfg.client %>/{app,components}/**/*.js',
          '!<%= cfg.client %>/{app,components}/**/*.spec.js',
          '!<%= cfg.client %>/{app,components}/**/*.mock.js'
        ],
        test: {
          src: [
            '<%= cfg.client %>/{app,components}/**/*.spec.js',
            '<%= cfg.client %>/{app,components}/**/*.mock.js'
          ]
        }
      },

      // Automatically inject Bower components into the app
      wiredep: {
        default: {
          src: '<%= cfg.client %>/index.html',
          ignorePath: '<%= cfg.client %>/',
          exclude: [
            /bootstrap-sass-official/,
            /bootstrap.css/,
            /bootstrap.js/,
            /font-awesome.css/,
            /json3.js/,
            /es5-shim.js/
          ]
        }
      },

      // Renames files for browser caching purposes.
      rev: {
        dist: {
          files: {
            src: [
              '<%= cfg.dist %>/public/{,*/}*.js',
              '<%= cfg.dist %>/public/{,*/}*.css',
              '<%= cfg.dist %>/public/assets/images/**/*.{png,jpg,jpeg,gif,webp,svg}',
              '<%= cfg.dist %>/public/assets/fonts/**/*.{eot,svg,ttf,woff,woff2}'
            ]
          }
        }
      },

      // Configure CSS minification to remove ALL comments.
      cssmin: {
        options: {
          keepSpecialComments: 0
        }
      },

      // Reads HTML for usemin blocks to enable smart builds that automatically
      // concat, minify and revision files. Creates configurations in memory so
      // additional tasks can operate on them
      useminPrepare: {
        html: ['<%= cfg.client %>/index.html'],
        options: {
          staging: '.dist',
          dest: '<%= cfg.dist %>/public'
        }
      },

      // Copies remaining files to places other tasks can use.
      copy: {
        dist: {
          files: [{
            expand: true,
            dot: true,
            cwd: '<%= cfg.client %>',
            dest: '<%= cfg.dist %>/public',
            src: [
              '*.{ico,png,txt}',
              '.htaccess',
              'bower_components/**/*',
              'assets/images/{,*/}*.{webp}',
              'assets/fonts/**/*',
              'assets/translations/**/*',
              'index.html'
            ]
          }, {
            expand: true,
            cwd: '.dist/images',
            dest: '<%= cfg.dist %>/public/assets/images',
            src: ['generated/*']
          }, {
            expand: true,
            dest: '<%= cfg.dist %>',
            src: [
              'package.json',
              'server/**/*'
            ]
          }]
        }
      },

      // Performs rewrites based on rev and the useminPrepare configuration
      usemin: {
        html: ['<%= cfg.dist %>/public/{,*/}*.html'],
        css: ['<%= cfg.dist %>/public/{,*/}*.css'],
        js: ['<%= cfg.dist %>/public/{,*/}*.js'],
        options: {
          assetsDirs: [
            '<%= cfg.dist %>/public',
            '<%= cfg.dist %>/public/assets/images',
            '<%= cfg.dist %>/public/assets/translations'
          ],
          // This is so we update image references in our ng-templates
          patterns: {
            js: [
              [/(assets\/images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved images']
            ]
          }
        }
      },

      // The following *-min tasks produce minified files in the dist folder
      imagemin: {
        dist: {
          files: [{
            expand: true,
            cwd: '<%= cfg.client %>/assets/images',
            src: '{,*/}*.{png,jpg,jpeg,gif}',
            dest: '<%= cfg.dist %>/public/assets/images'
          }]
        }
      },

      svgmin: {
        dist: {
          files: [{
            expand: true,
            cwd: '<%= cfg.client %>/assets/images',
            src: '{,*/}*.svg',
            dest: '<%= cfg.dist %>/public/assets/images'
          }]
        }
      },

      //
      // Server
      //

      // Set the environment for the express server.
      env: {
        test: {
          NODE_ENV: 'test'
        },
        prod: {
          NODE_ENV: 'production'
        }
      },

      // Run the express server application.
      express: {
        options: {
          port: process.env.PORT || 9000
        },
        dev: {
          options: {
            script: 'server/app.js',
            debug: true
          }
        },
        prod: {
          options: {
            script: '<%= cfg.dist %>/server/app.js'
          }
        }
      },

      // Open the application.
      open: {
        server: {
          url: 'http://localhost:<%= express.options.port %>'
        }
      },

      // Start watching for changes.
      watch: {
        options: {
          event: ['changed', 'added', 'deleted']
        },
        javascript: {
          files: [
            '<%= cfg.client %>/app/**/*.js', '<%= cfg.client %>/.js/**/*.js', '<%= cfg.client %>/components/**/*.js'
          ],
          tasks: ['injector:scripts', 'jshint', 'test']
        },
        html: {
          files: [
            '<%= cfg.client %>/app/**/*.html', '<%= cfg.client %>/components/**/*.html'
          ],
          tasks: []
        },
        less: {
          files: [
            '<%= cfg.client %>/app/**/*.less', '<%= cfg.client %>/components/**/*.less', '<%= cfg.client %>/bower_components/**/*.less'
          ],
          tasks: ['injector:less', 'less', 'autoprefixer']
        },
        css: {
          files: [
            '<%= cfg.client %>/app/**/*.css', '<%= cfg.client %>/components/**/*.css'
          ],
          tasks: ['injector:css']
        },
        livereload: {
          files: [
            '<%= cfg.client %>/**/*.*'
          ],
          options: {
            livereload: {
              port: 35729
            }
          }
        }
      },

      //
      // Testing
      //

      // Inject bower dependencies into index.html and karma.conf.js.
      bowerInstall: {
        app: {
          src: '<%= cfg.client %>/index.html',
          ignorePath: '<%= cfg.client %>/',
          exclude: [
            /bootstrap-sass-official/,
            /bootstrap.css/,
            /bootstrap.js/,
            /font-awesome.css/,
            /json3.js/,
            /es5-shim.js/
          ]
        },
        test: {
          src: 'karma.conf.js',
          fileTypes: {
            js: {
              block: /(([\s\t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi,
              detect: {
                js: /'.*\.js'/gi
              },
              replace: {
                js: '\'{{filePath}}\','
              }
            }
          }
        }
      },

      // Unit testing.
      karma: {
        unit: {
          configFile: 'karma.conf.js',
          singleRun: true,
          debug: true
        }
      },

      // Real testing.
      protractor: {
        options: {
          configFile: 'protractor.conf.js'
        },
        chrome: {
          options: {
            args: {
              browser: 'chrome'
            }
          }
        }
      }


    }
  );
};
