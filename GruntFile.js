/* jshint camelcase:false */
module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            uses_defaults: {}
        },
        copy: {
            main: {
                expand: true,
                cwd: 'src/',
                src: '**',
                dest: 'dist/'
            }
        },
        clean: {
            main: ['dist']
        },
        'gh-pages': {
            options: {
                base: 'dist'
            },
            src: ['**']
        },
        jshint: {
            main: {
                // must use src for newer to work
                src: ['src/app/**.js']
            },
            options: {
                jshintrc: '.jshintrc'
            }
        },
        watch: {
            jshint: {
                files: ['src/app/**.js'],
                tasks: ['jshint:main']
            },
            src: {
                files: ['**'],
                options: {
                    livereload: true
                }
            }
        }
    });

    // Loading dependencies
    for (var key in grunt.file.readJSON('package.json').devDependencies) {
        if (key !== 'grunt' && key.indexOf('grunt') === 0) {
            grunt.loadNpmTasks(key);
        }
    }

    // Default task.
    grunt.registerTask('default', [
        'jshint',
        'connect',
        'watch'
    ]);

    grunt.registerTask('publish', [
        'clean:main',
        'copy:main',
        'gh-pages'
    ]);
};