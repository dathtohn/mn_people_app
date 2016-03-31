'use strict';
module.exports = function(grunt) {

  grunt.initConfig({

    react: {
      combined_file_output: {
        files: {
          'js/components.js': [
            'components/**/*.jsx'
          ]
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'actions/*.js',
        'dispatcher/*.js',
        'js/*.js',
        '!js/vendor/**/*.js',
        '!js/scripts.min.js',
      ]
    },

    sass_globbing: {
      dist: {
        files: {
          'sass/components.scss': 'components/**/*.scss',
        },
        options: {
          useSingleQuotes: false
        }
      }
    },

    sass: {
      dist: {
        options: {
          style: 'compressed',
          compass: true,
          // Source maps are available, but require Sass 3.3.0 to be installed
          // https://github.com/gruntjs/grunt-contrib-sass#sourcemap
          sourcemap: false
        },
        files: {
          'css/main.min.css': [
            'sass/main.scss',
          ]
        }
      }
    },

    uglify: {
      dist: {
        files: {
          'js/scripts.min.js': [
            'actions/*.js',
            'dispatcher/*.js',
            'js/vendor/react-0.13.1/**/*.js',
            'js/components.js'
          ]
        },
        options: {
          // JS source map: to enable, uncomment the lines below and update sourceMappingURL based on your install
          // sourceMap: 'js/scripts.min.js.map',
          // sourceMappingURL: '/app/themes/roots/js/scripts.min.js.map'
        }
      }
    },

    watch: {
      react: {
        files: 'components/**/*.jsx',
        tasks: ['react']
      },
      js: {
        files: [
          '<%= jshint.all %>'
        ],
        tasks: ['jshint', 'uglify']
      },
      livereload: {
        // Browser live reloading
        // https://github.com/gruntjs/grunt-contrib-watch#live-reloading
        options: {
          livereload: false
        },
        files: [
          'css/main.min.css',
          'js/scripts.min.js',
        ]
      }
    },

    clean: {
      dist: [
        'css/main.min.css',
        'js/scripts.min.js',
      ]
    }

  });

  grunt.loadNpmTasks('grunt-react');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-sass-globbing');

  // Register tasks
  grunt.registerTask('default', [
    'react',
    'clean',
    'sass_globbing',
    'sass',
    'uglify'
  ]);
  grunt.registerTask('dev', [
    'watch'
  ]);

};
