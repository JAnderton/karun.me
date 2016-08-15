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
        files: ['css/*.css'],
        tasks: ['cssmin'],
      },
      resources: {
        files: ['img/*.{png,jpg,gif}}'],
        tasks: ['imagemin'],
      },
      resources: {
        files: ['resources/*.ico}'],
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
    copy: {
      main: {
        expand: true,
        cwd: 'resources',
        src: '**',
        dest: 'out/',
      },
    },
    browserSync: {
      dev: {
        bsFiles: {
          src : [
            'out/css/*',
            'out/img/*',
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
          cwd: 'css',
          src: ['*.css', '!*.min.css'],
          dest: 'out/css'
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
          src: ['img/*.{png,jpg,gif}'],
          dest: 'out'
        }]
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('build', ['mustache_render', 'cssmin', 'imagemin', 'htmlmin', 'copy']);
  grunt.registerTask('dev', ['build', 'browserSync', 'watch']);
  grunt.registerTask('default', ['build']);
};
