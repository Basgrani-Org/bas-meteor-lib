module.exports = function ( grunt ) {
    'use strict';

    // Force use of Unix newlines
    grunt.util.linefeed = '\n';

    RegExp.quote = function (string) {
        return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
    };

    /**
     * Config.
     */
    grunt.initConfig({

        // ------------------------------------------------------------------------
        // Meta
        // ------------------------------------------------------------------------

        pkg : grunt.file.readJSON('package.json'),

        meta: {
            name: 'BasMeteor LIB',
            name_root_file: '<%= pkg.name %>',
            utils_dist_dir: 'utils/dist',
            utils_es6_dir: 'utils/es6',
            jwplayer_dist_dir: 'jwplayer/dist',
            jwplayer_es6_dir: 'jwplayer/es6'
        },

        // ------------------------------------------------------------------------
        // JS
        // ------------------------------------------------------------------------

        // Babel
        babel: {
            options: {
                "presets": [
                    ["es2015", { "modules": "commonjs" }]
                ]
            },
            utils: {
                options: {
                    sourceMap: false
                },
                expand: true,
                cwd: '<%= meta.utils_es6_dir %>/',
                src: '**/*.js',
                dest: '<%= meta.utils_dist_dir %>/'

            },
            jwplayer: {
                options: {
                    sourceMap: false
                },
                expand: true,
                cwd: '<%= meta.jwplayer_es6_dir %>/',
                src: '**/*.js',
                dest: '<%= meta.jwplayer_dist_dir %>/'

            }
        },

        // ------------------------------------------------------------------------
        // Others
        // ------------------------------------------------------------------------

        // Clean
        clean: {
            utils: {
                src: ["<%= meta.utils_dist_dir %>/*"]
            },
            jwplayer: {
                src: ["<%= meta.jwplayer_dist_dir %>/*"]
            }
        },

        // System Notifications
        notify: {
            js_compile: {
                options: {
                    enabled: true,
                    message: 'JS Compiled!',
                    title: "<%= meta.name %>",
                    success: true,
                    duration: 1
                }
            }
        }

    });

    /**
     * Load Grunt tasks.
     */
    require('load-grunt-tasks')(grunt, { scope: 'devDependencies',
        // Exclude Plugins.
        pattern: ['grunt-*'] });

    /**
     * Register Grunt tasks (Main)
     */

    // Babel (utils)
    grunt.registerTask('_utils_babel_compile', ['clean:utils', 'babel:utils']);
    grunt.registerTask('utils_babel_compile', ['_utils_babel_compile', 'notify:js_compile']);

    // Babel (jwplayer)
    grunt.registerTask('_jwplayer_babel_compile', ['clean:jwplayer', 'babel:jwplayer']);
    grunt.registerTask('jwplayer_babel_compile', ['_jwplayer_babel_compile', 'notify:js_compile']);

};
