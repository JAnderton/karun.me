module.exports = function (grunt) {
  var mozjpeg = require('imagemin-mozjpeg');

  grunt.initConfig({
    watch: {
      tasks: ['mustache_render'],
      templates: {
        files: ['templates/*.mustache'],
        tasks: ['mustache_render'],
      },
      partials: {
        files: ['templates/partials/*.mustache'],
        tasks: ['mustache_render'],
      },
      data: {
        files: ['data/*.json'],
        tasks: ['mustache_render'],
      },
      resources: {
        files: ['resources/*'],
        tasks: ['copy'],
      },
    },
    mustache_render: {
      all: {
        files: [
          {
            data: "data/karun.json",
            template: "templates/webpage.mustache",
            dest: "out/index.html"
          }
        ]
      }
    },
    browserSync: {
      dev: {
        bsFiles: {
          src : [
            'out/resources/*',
            'out/*'
          ]
        },
        options: {
          watchTask: true,
          server: './out'
        }
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'resources',
          src: ['*.css', '!*.min.css'],
          dest: 'out/resources'
        }]
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'out/index.html': 'out/index.html'
        }
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          src: ['resources/*.{png,jpg,gif}'],
          dest: 'out'
        }]
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['mustache_render']);
  grunt.registerTask('min', ['cssmin', 'imagemin', 'htmlmin']);
  grunt.registerTask('build', ['default', 'min']);
  grunt.registerTask('dev', ['build', 'browserSync', 'watch']);
};
