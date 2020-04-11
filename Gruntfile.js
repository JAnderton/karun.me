module.exports = function (grunt) {
  grunt.initConfig({
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
      },
      bootstrap_css: {
        src: 'bootstrap/css/bootstrap.min.css',
        dest: 'out/bootstrap/css/bootstrap.min.css'
      },
      js: {
        expand: true,
        cwd: 'js',
        src: '*.js',
        dest: 'out/js/'
      },
      cp_css: {
        expand: true,
        cwd: 'css',
        src: '*.css',
        dest: 'out/css/'
      },
    },
    cwebp: {
      static: {
        files: {
          'out/img/person.webp': 'img/person.png'
        }
      },
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

  grunt.registerTask('build', ['cwebp', 'copy', 'processhtml']);
  grunt.registerTask('dev', ['build', 'browserSync', 'watch']);
  grunt.registerTask('default', ['build']);
};
