module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        config: PathConfig,

        // Sprites
        sprite: {
            all: {
                src: 'images/icons/*',
                dest: 'images/sprite.png',
                destCss: 'sass/helpers/_sprite.scss',
                imgPath: '../images/sprite.png',
                padding: 2
            }
        },

        // Styles
        sass: {
            options: {
                sourceMap: true,
                outputStyle: 'compressed'
            },
            dist: {
                files: {
                    'assets/main.min.css': 'sass/main.scss'
                }
            }
        },

        // Scripts
        uglify: {
            my_target: {
                options: {
                    sourceMap: true
                },
                files: {
                    'assets/main.min.js': [
                        'js/jquery.min.js',
                        'js/libs/**/*.js',
                        'js/functions.js'
                    ]
                }
            }
        },

        // Watch
        watch: {
            sprite: {
                files: ['images/**/*'],
                tasks: ['sprite']
            },
            sass: {
                files: ['sass/**/*'],
                tasks: ['sass']
            },
            uglify: {
                files: ['js/**/*'],
                tasks: ['uglify']
            }
        }
    });

    // Load plugins
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task
    grunt.registerTask('default', 'build');
    grunt.registerTask('build', ['sprite', 'sass', 'uglify']);

};
