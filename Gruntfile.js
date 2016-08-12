
module.exports = function (grunt) {
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
    copy: {
      main: {
        expand: true,
        src: 'resources/*',
        dest: 'out/',
      },
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
    }
  });

  grunt.loadNpmTasks('grunt-mustache-render');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browser-sync');

  grunt.registerTask('default', ['mustache_render', 'copy']);
  grunt.registerTask('build', ['default']);
  grunt.registerTask('dev', ['build', 'browserSync', 'watch']);
};
