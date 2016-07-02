module.exports = function(grunt) {
    // All upfront config goes in a massive nested object.
    grunt.initConfig({
        // You can set arbitrary key-value pairs.
        distFolder: 'src/main/resources/public/lib/app',

        pkg: grunt.file.readJSON('package.json'),

        // Grunt tasks are associated with specific properties.
        // these names generally match their npm package name.
        concat: {
            // Specify some options, usually specific to each plugin.
            options: {
                // Specifies string to be inserted between concatenated files.
                separator: '\n'
            },
            app: {
                src: [
                    'src/main/angular/app/app.js',
                    'src/main/angular/app/**/*.js'
                ],
                dest: '<%= distFolder %>/app.js'
            },
            welcome: {
                src: [
                    'src/main/angular/welcome/welcome.js',
                    'src/main/angular/welcome/**/*.js'
                ],
                dest: '<%= distFolder %>/welcome.js'
            }
        },

        uglify: {
            options: {
                banner: '/* \n BMS-v<%=pkg.version%> - <%=grunt.template.today("dd-mm-yyyy")%> \n Copyright © 2016 An Nguyen <thienan93@yahoo.com>\n All rights reserved. \n*/\n\n'
            },
            app: {
                files: {
                    '<%= distFolder %>/app.min.js': '<%= distFolder %>/app.js'
                }
            },
            welcome: {
                files: {
                    '<%= distFolder %>/welcome.min.js': '<%= distFolder %>/welcome.js'
                }
            }
        },

        clean: {
            // Deletes all .js files
            all: ['<%= distFolder %>/**/*.js'],

            // Deletes all .js files, but skips min.js files
            js: ['<%= distFolder %>/**/*.js', '!<%= distFolder %>/**/*.min.js']
        },

        //copy task is only using for development environment
        copy: {
            dist: {
                files: [{
                    expand: true,
                    src: ['<%= distFolder %>/**/*.js'],
                    dest: '<%= distFolder %>/',
                    rename: function(dest, src) {
                        return dest + src.substring(src.lastIndexOf('/') + 1).replace(".js", ".min.js");
                    }
                }]
            }
        }
    }); // The end of grunt.initConfig

    // We've set up each task's configuration.
    // Now actually load the tasks.
    // This will do a lookup similar to node's require() function.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Register our own custom task alias.
    grunt.registerTask('dev', ['clean:all', 'concat', 'copy', 'clean:js']);
    grunt.registerTask('production', ['clean:all', 'concat', 'uglify', 'clean:js']);
    grunt.registerTask('default', ['clean:all', 'concat', 'uglify', 'clean:js']);
};