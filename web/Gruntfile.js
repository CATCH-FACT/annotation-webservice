module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ';'
      },
      dist: {
        // the files to concatenate
        src: [
          'js/3rdparty/jquery-2.1.1.min.js',
          'js/3rdparty/jquery-2.1.1.min.js',
          'js/3rdparty/bootstrap.min.js',
          'js/3rdparty/knockout-3.2.0.min.js',
          'node_modules/bootstrap-slider/dist/bootstrap-slider.min.js',
          'js/fact.js'
        ],
        // the location of the resulting JS file
        dest: 'js/build/<%= pkg.name %>.js'
      }
    }, 

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        src: 'js/build/<%= pkg.name %>.js',
        dest: 'js/build/<%= pkg.name %>.min.js'
      }
    },

    watch: {
        scripts: {
            files: ['js/*.js'],
            tasks: ['concat', 'uglify'],
            options: {
              spawn: false,
            },
        } 
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['concat', 'uglify']);


};
