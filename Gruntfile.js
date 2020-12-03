const { join } = require('path')

const PACKAGE_FILE = 'package.json',
    CONFIG_ESLINT = '.eslintrc.json',
    CONFIG_TS = 'tsconfig.dev.json',
    CONFIG_TYPEDOC = './typedoc.json'

const DIR_TS_CACHE = '.tscache',
    DIR_SRC = 'src/',
    DIR_DIST = 'dist/',
    DIR_DIST_DOCS = 'docs/',
    DIR_DIST_ASSETS = join(DIR_DIST, 'assets')

const SRC_TS_BLOB = [join(DIR_SRC, '**/*.ts')],
    SRC_SASS_BLOB = [join(DIR_SRC, 'style/**/*.scss')],
    SRC_ASSETS_BLOB = [join(DIR_SRC, 'assets/**')],
    SRC_SASS_FILE = join(DIR_SRC, 'style/index.scss')

const DIST_STYLE_FILE = 'style.css'

const TASK_CODE = 'ts',
    TASK_DOC = 'typedoc',
    TASK_COPY = 'copy',
    TASK_LINT = 'eslint',
    TASK_STYLE = 'dart-sass'

module.exports = function(grunt) {
    const typedoc_config = require('./' + CONFIG_TYPEDOC)
    typedoc_config.out = DIR_DIST_DOCS

    const SRC_SASS_OPTIONS = {
        src: SRC_SASS_FILE,
        dest: join(DIR_DIST, DIST_STYLE_FILE)
    }

    grunt.config.init({
        pkg: grunt.file.readJSON(PACKAGE_FILE),
        ts: {
            default : {
                tsconfig: CONFIG_TS,
                tsCacheDir: DIR_TS_CACHE
            }
        },
        watch: {
            main: {
                files: SRC_TS_BLOB,
                tasks: [TASK_LINT, TASK_CODE, TASK_DOC]
            },
            typescript: { // only typescript
                files: SRC_TS_BLOB,
                tasks: [TASK_CODE]
            },
            'ts-doc': { // typescript and typedoc
                files: SRC_TS_BLOB,
                tasks: [TASK_CODE, TASK_DOC]
            },
            lint: {
                files: SRC_TS_BLOB,
                tasks: [TASK_LINT]
            },
            style: {
                files: SRC_SASS_BLOB,
                tasks: [TASK_STYLE]
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
                configFile: CONFIG_ESLINT
            },
            target: SRC_TS_BLOB
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
        copy: {
            main: {
                files: [
                    {src: SRC_ASSETS_BLOB, dest: DIR_DIST_ASSETS},
                ],
            },
        },
        clean: [DIR_DIST, DIR_DIST_DOCS, DIR_TS_CACHE],
    })

    // loading tasks
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-ts')
    grunt.loadNpmTasks('grunt-typedoc')
    grunt.loadNpmTasks('grunt-eslint')
    grunt.loadNpmTasks('grunt-dart-sass')
    grunt.loadNpmTasks('grunt-contrib-copy')
    grunt.loadNpmTasks('grunt-contrib-clean')

    // default build task
    grunt.registerTask('default', [TASK_LINT, TASK_CODE, TASK_COPY, TASK_STYLE])

    // dev task
    grunt.registerTask('dev', [TASK_LINT, TASK_CODE, TASK_DOC, TASK_COPY, TASK_STYLE])
}
