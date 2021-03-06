const { join } = require('path')

// config files
const PACKAGE_FILE = 'package.json',
    CONFIG_ESLINT = '.eslintrc.json',
    CONFIG_TS = 'tsconfig.dev.json',
    CONFIG_TYPEDOC = './typedoc.json'

// directories
const DIR_TS_CACHE = '.tscache',
    DIR_SASS_CACHE = '.sass-cache',
    DIR_SRC = 'src/',
    DIR_DIST = 'dist/',
    DIR_DIST_DOCS = 'docs/',
    DIR_DIST_ASSETS = join(DIR_DIST, 'assets')

// source files and blobs
const SRC_TS_BLOB = [join(DIR_SRC, '**/*.ts')],
    SRC_ASSETS_BLOB = [join(DIR_SRC, 'client/assets/**')],
    SRC_SASS_FILE = join(DIR_SRC, 'client/index.scss'),
    SRC_SASS_BLOB = [join(DIR_SRC, 'client/index.scss'), join(DIR_SRC, 'client/style/**/*.scss')],
    SRC_EJS_FILE = join(DIR_SRC, 'client/index.ejs'),
    SRC_EJS_BLOB = [join(DIR_SRC, 'client/index.ejs'), join(DIR_SRC, 'client/**/*.ejs')]

// dist file names
const DIST_STYLE_FILE = 'style.css',
    DIST_HTML_FILE = 'index.html'

// live server configs
const WEBSERVER_PORT = 61337,
    WEBSERVER_RELOAD_PORT = 61338, // set false to disable
    WEBSERVER_LIVERELOAD_FILE = '//localhost:' + WEBSERVER_RELOAD_PORT + '/livereload.js',
    WEBSERVER_OPEN_BROWSER = true

// tasks names
const TASK_CODE = 'ts',
    TASK_DOC = 'typedoc',
    TASK_COPY = 'copy',
    TASK_LINT = 'eslint',
    TASK_STYLE = 'dart-sass',
    TASK_HTML = 'ejs:production',
    TASK_HTML_INJECT = 'ejs:inject',
    TASK_MINIFY_HTML = 'htmlmin:prod'

// complete tasks
const TASK_ARRAY_PRODUCTION = [TASK_LINT, TASK_CODE, TASK_COPY, TASK_STYLE, TASK_HTML, TASK_MINIFY_HTML],
    TASK_ARRAY_DEV = [TASK_LINT, TASK_CODE, TASK_DOC, TASK_COPY, TASK_STYLE, TASK_HTML_INJECT]

module.exports = function(grunt) {
    grunt.option('no-color', true) // disable annoying windows sound

    const typedoc_config = require('./' + CONFIG_TYPEDOC)
    typedoc_config.out = DIR_DIST_DOCS

    const minify_files = {}
    minify_files[join(DIR_DIST, DIST_HTML_FILE)] = join(DIR_DIST, DIST_HTML_FILE)

    const SRC_SASS_OPTIONS = {
        src: SRC_SASS_FILE,
        dest: join(DIR_DIST, DIST_STYLE_FILE)
    }

    grunt.config.init({
        pkg: grunt.file.readJSON(PACKAGE_FILE),
        ts: {
            default : {
                tsconfig: CONFIG_TS
            },
            options: {
                tsCacheDir: DIR_TS_CACHE
            }
        },
        watch: {
            options: {
                livereload: WEBSERVER_RELOAD_PORT
            },
            typescript: {
                files: SRC_TS_BLOB,
                tasks: [TASK_LINT, TASK_CODE, TASK_DOC]
            },
            style: {
                files: SRC_SASS_BLOB,
                tasks: [TASK_STYLE]
            },
            ejs: {
                files: SRC_EJS_BLOB,
                tasks: [TASK_HTML_INJECT]
            },
            assets: {
                files: SRC_ASSETS_BLOB,
                tasks: [TASK_COPY]
            }
        },
        typedoc: {
            build: {
                options: typedoc_config,
                src: SRC_TS_BLOB
            }
        },
        eslint: {
            options: {
                configFile: CONFIG_ESLINT,
                failOnError: false
            },
            target: SRC_TS_BLOB
        },
        ejs: {
            production: {
                src: [SRC_EJS_FILE],
                dest: join(DIR_DIST, DIST_HTML_FILE),
                expand: false,
                options: {
                    injectSnippet: ''
                }
            },
            inject: {
                src: [SRC_EJS_FILE],
                dest: join(DIR_DIST, DIST_HTML_FILE),
                expand: false,
                options: {
                    injectSnippet: '<script src="' + WEBSERVER_LIVERELOAD_FILE +'"></script>'
                }
            }
        },
        'dart-sass': {
            dist: {
                options: {
                    sourceMap: true
                },
                files: [SRC_SASS_OPTIONS]
            },
            prod: {
                options: {
                    sourceMap: false,
                    outputStyle: 'compressed'
                },
                files: [SRC_SASS_OPTIONS]
            }
        },
        htmlmin: {
            prod: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: minify_files
            }
        },
        copy: {
            main: {
                files: [
                    {src: SRC_ASSETS_BLOB, dest: DIR_DIST_ASSETS},
                ],
            },
        },
        clean: [DIR_DIST, DIR_DIST_DOCS, DIR_TS_CACHE, DIR_SASS_CACHE],
        connect: {
            server: {
                options: {
                    port: WEBSERVER_PORT,
                    hostname: '*',
                    base: DIR_DIST,
                    keepalive: true,
                    open: WEBSERVER_OPEN_BROWSER
                },
            },
        },
        concurrent: {
            production: TASK_ARRAY_PRODUCTION,
            dev: TASK_ARRAY_DEV,
            live: {
                tasks: ['watch', 'connect', ...TASK_ARRAY_DEV],
                options: {
                    logConcurrentOutput: true
                }
            }
        }
    })

    require('load-grunt-tasks')(grunt)

    grunt.registerTask('default', 'concurrent:production')
    grunt.registerTask('dev', 'concurrent:production')
    grunt.registerTask('live', 'concurrent:live')
}
