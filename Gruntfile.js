module.exports = function (grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    connect: {
      server: {
        options: {
          port: 3000,
          base: '.',
        }
      }
    },

    clean: {
      release: [
        'package.json',
        'bower.json', '.bowerrc',
        '.gitignore', '.gitmodules',
        '*.jade', 'examples',
        'scss', '*.scss', '*.sass', '*.map', '.sass-cache',
        'Gruntfile.js', 'node_modules',
      ],

      build: [
        '.sass-cache',
        'bower_components', 'components',
        'node_modules'
      ]
    },

    jade: {
      dev: {
        options: {
          data: {
            debug: true,
            pretty: true
          }
        },
        files: [{
          cwd: 'examples',
          src: '*.jade',
          dest: 'examples',
          expand: true,
          ext: '.html'
        }]
      }
    },

    sass: {
      dev: {
        options: {
          precision: 6,
          sourcemap: 'auto',
          style: 'expanded',
          trace: true
        },
        files: {
          'style.css': 'assets/scss/style.{scss, sass}',
        }
      },

      dist: {
        options: {
          precision: 10,
          sourcemap: 'none',
          style: 'compact',
          trace: false,
          noCache: true
        },
        files: {
          'style.css': 'assets/scss/style.scss'
        }
      },
    },

    postcss: {
      dev: {
        options: {
          map: true,
          processors: [
            require('autoprefixer')({
              browsers: ['last 2 version']
            })
          ]
        },
        src: 'style.css'
      },

      dist: {
        options: {
          map: false,
          processors: [
            require('autoprefixer')({
              browsers: ['last 3 version', 'ie 8']
            })
          ]
        },
        src: 'style.css'
      }
    },

    cssmin: {
      dist: {
        options: {
          sourceMap: false,
          shorthandCompacting: false,
          roundingPrecision: -1
        },
        files: 'style.css'
      }
    },

    wiredep: {
      dev: {
        options: {
          dependencies: true,
          devDependencies: true,
          'overrides': {
            'font-awesome': {
              'main': [
                'less/font-awesome.less',
                'scss/font-awesome.scss',
                'css/font-awesome.css'
              ]
            }
          }
        },

        src: [
          '{,*/,*/*/}*.jade'
        ],
      }
    },

    notify: {
      options: {
        title: 'Grunt'
      },

      build: {
        options: {
          message: 'Project has been built.'
        }
      },

      release: {
        options: {
          message: 'Project has been built & cleaned up.'
        }
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
      },

      js: {
        options: {
          message: 'JavaScript files has been checked.'
        }
      }
    },

    watch: {
      options: {
        livereload: true,
        dateFormat: function (time) {
          grunt.log.writeln('Grunt has finished in ' + time + 'ms!');
          grunt.log.writeln('Waiting...');
        },
        event: ['all']
      },

      configFiles: {
        files: ['Gruntfile.js'],
        tasks: ['notify:grunt'],
        options: {
          reload: true
        }
      },

      jade: {
        files: '{,*/,*/*/,*/*/*/}*.jade',
        tasks: ['jade:dev', 'wiredep:dev', 'notify:jade']
      },

      sass: {
        files: '{,*/,*/*/,*/*/*/}*.{scss,sass}',
        tasks: ['sass:dev', 'postcss:dev', 'notify:sass']
      }
    }
  });

  grunt.registerTask('release', ['sass:dist', 'postcss:dist', 'cssmin:dist', 'notify:release', 'clean:release']);
  grunt.registerTask('build', ['jade:dev', 'sass:dev', 'notify:build']);
  grunt.registerTask('default', ['connect:server', 'notify:server', 'watch']);
};