/* jshint camelcase:false */
module.exports = function(grunt) {
    var jsFiles = 'src/app/**/*.js',
        otherFiles = [
            'src/app/**/*.html',
            'src/app/**/*.css',
            'src/index.html',
            'src/ChangeLog.html'
        ],
        gruntFile = 'GruntFile.js',
        internFile = 'tests/intern.js',
        jshintFiles = [
            jsFiles,
            gruntFile,
            internFile
        ],
        bumpFiles = [
            'package.json',
            'bower.json',
            'src/app/package.json',
            'src/app/config.js'
        ],
        deployFiles = [
            '**',
            '!**/*.min.*',
            '!**/*.uncompressed.js',
            '!**/*consoleStripped.js',
            '!**/bootstrap/less/**',
            '!**/bootstrap/test-infra/**',
            '!**/tests/**',
            '!build-report.txt',
            '!components-jasmine/**',
            '!favico.js/**',
            '!jasmine-favicon-reporter/**',
            '!jasmine-jsreporter/**',
            '!stubmodule/**',
            '!util/**'
        ]

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            uses_defaults: {}
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
                src: jshintFiles
            },
            options: {
                jshintrc: '.jshintrc'
            }
        },
        watch: {
            jshint: {
                files: jshintFiles,
                tasks: ['newer:jshint:main', 'jasmine:main:build']
            },
            src: {
                files: jshintFiles.concat(otherFiles),
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
        'connect',
        'watch'
    ]);
};
