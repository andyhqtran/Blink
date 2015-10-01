module.exports = function (grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Server
    connect: {
      server: {
        options: {
          port: 3000,
          base: 'examples',
        }
      }
    },

    // Clean
    clean: {
      css: ['{,*/,*/*/,*/*/*/}*.css', '{,*/,*/*/,*/*/*/}*.map'],
      html: '{,*/,*/*/,*/*/*/}*.html',
      cache: '.sass-cache',
      bower: 'bower_components',
      npm: 'node_modules'
    },

    // Jade
    jade: {
      options: {
        data: {
          debug: true,
          pretty: true
        }
      },
      dev: {
        files: [{
          cwd: 'examples',
          src: '*.jade',
          dest: 'examples',
          expand: true,
          ext: '.html'
        }]
      }
    },

    // Sass
    sass: {
      options: {
        precision: 6,
        sourcemap: 'auto',
        style: 'expanded',
        trace: true
      },
      dev: {
        files: {
          'style.css': 'scss/main.{scss, sass}',
        }
      }
    },

    // Postcss
    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer')({
            browsers: ['last 2 version', 'ie 8']
          })
        ]
      },
      dev: {
        src: 'style.css'
      }
    },

    // Notify
    notify: {
      options: {
        title: 'Grunt'
      },

      server: {
        options: {
          message: 'Grunt has been activated.'
        }
      },

      grunt: {
        options: {
          message: 'Grunt has been updated.'
        }
      },

      jade: {
        options: {
          message: 'Jade files has been compiled.'
        }
      },

      sass: {
        options: {
          message: 'Sass files has been compiled.'
        }
      }
    },

    // Watch
    watch: {
      options: {
        livereload: true,
        dateFormat: function (time) {
          grunt.log.writeln('Grunt has finished in ' + time + 'ms!');
          grunt.log.writeln('Waiting...');
        },
        event: ['all']
      },

      // Gruntfile
      configFiles: {
        files: ['Gruntfile.js'],
        tasks: ['notify:grunt'],
        options: {
          reload: true
        }
      },

      // Jade
      jade: {
        files: '{,*/,*/*/,*/*/*/}*.jade',
        tasks: ['jade', 'notify:jade']
      },

      // Sass
      sass: {
        files: '{,*/,*/*/,*/*/*/}*.{scss,sass}',
        tasks: ['sass', 'postcss', 'notify:sass']
      }
    }
  });

  grunt.registerTask('default', ['connect:server', 'notify:server', 'watch']);
};