module.exports = function (grunt) {
  grunt.initConfig({
    watch: {
      resources: {
        files: ['js/*.js'],
        tasks: ['uglify']
      },
      resources: {
        files: ['css/*.css'],
        tasks: ['cssmin']
      },
      resources: {
        files: ['img/*.{png,jpg,gif}}'],
        tasks: ['cwebp']
      },
      resources: {
        files: ['resources/*.ico}'],
        tasks: ['copy']
      },
    },
    copy: {
      resources: {
        expand: true,
        cwd: 'resources',
        src: '**',
        dest: 'out/'
      },
      fonts: {
        expand: true,
        cwd: 'fonts',
        src: '**',
        dest: 'out/fonts/'
      },
      img_svg: {
        expand: true,
        cwd: 'img',
        src: '*.svg',
        dest: 'out/img/'
      }
    },
    browserSync: {
      dev: {
        bsFiles: {
          src: [
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
    cwebp: {
      static: {
        files: {
          'out/img/person.webp': 'img/person.png'
        }
      },
    },
    uglify: {
      js: {
        files: {
          'out/js/all.js': ['js/*.js']
        }
      }
    },
    uncss: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'out/css/only_used.css': ['index.html']
        }
      }
    },
    processhtml: {
      dist: {
        files: {
          'out/index.html': 'index.html'
        }
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
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('build', ['cwebp', 'uglify', 'uncss', 'processhtml', 'htmlmin', 'copy']);
  grunt.registerTask('dev', ['build', 'browserSync', 'watch']);
  grunt.registerTask('default', ['build']);
};
