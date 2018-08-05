module.exports = function (grunt) {
  grunt.initConfig({
    watch: {
      resources: {
        files: ['js/*.js'],
        tasks: ['uglify'],
      },
      resources: {
        files: ['css/*.css'],
        tasks: ['cssmin'],
      },
      resources: {
        files: ['img/*.{png,jpg,gif}}'],
        tasks: ['imgmin'],
      },
      resources: {
        files: ['resources/*.ico}'],
        tasks: ['copy'],
      },
    },
    copy: {
      resources: {
        expand: true,
        cwd: 'resources',
        src: '**',
        dest: 'out/',
      },
      min_js: {
        expand: true,
        cwd: 'js',
        src: '*.min.js',
        dest: 'out/js/',
      },
      bootstrap_min_css: {
        expand: true,
        cwd: 'bootstrap/css',
        src: '*.min.css',
        dest: 'out/bootstrap/css',
      },
      fonts: {
        expand: true,
        cwd: 'fonts',
        src: '**',
        dest: 'out/fonts/',
      },
      min_css: {
        expand: true,
        cwd: 'css',
        src: '*.min.css',
        dest: 'out/css/',
      }
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
          'out/index.html': 'index.html'
        }
      }
    },
    cwebp: {
      images: {
        files: {
          'out/img/person.png': [ 'img/person.png' ]
        }
      }
    },
    uglify: {
      dist: {
        files: {
          'out/js/script.js': ['js/script.js']
        }
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('build', [
    'cwebp',
    'cssmin',
    'uglify',
    'htmlmin',
    'copy'
  ]);
  grunt.registerTask('dev', ['build', 'browserSync', 'watch']);
  grunt.registerTask('default', ['build']);
};
