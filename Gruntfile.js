const { join } = require('path')

const PACKAGE_FILE = 'package.json',
    CONFIG_ESLINT = '.eslintrc.json',
    CONFIG_TS = 'tsconfig.dev.json',
    CONFIG_TYPEDOC = './typedoc.json',
    TS_CACHE_DIR = '.tscache',
    SRC_FOLDER = 'src/',
    DIST_FOLDER = 'dist/',
    DOCS_DIST = 'docs/',
    TS_FILES_BLOB = [join(SRC_FOLDER, '**/*.ts')],
    ASSETS_SRC = [join(SRC_FOLDER + 'assets/**')],
    ASSETS_DIST = join(DIST_FOLDER + 'assets/**')

module.exports = function(grunt) {
    const typedoc_config = require('./' + CONFIG_TYPEDOC)
    typedoc_config.out = DOCS_DIST

    grunt.config.init({
        pkg: grunt.file.readJSON(PACKAGE_FILE),
        ts: {
            default : {
                tsconfig: CONFIG_TS,
                tsCacheDir: TS_CACHE_DIR
            }
        },
        watch: {
            main: {
                files: TS_FILES_BLOB,
                tasks: ['eslint','ts', 'typedoc']
            },
            typescript: { // only typescript
                files: TS_FILES_BLOB,
                tasks: ['ts']
            },
            'ts-doc': { // typescript and typedoc
                files: TS_FILES_BLOB,
                tasks: ['ts', 'typedoc']
            },
            lint: {
                files: TS_FILES_BLOB,
                tasks: ['eslint']
            }
        },
        typedoc: {
            build: {
                options: typedoc_config,
                src: TS_FILES_BLOB
            }
        },
        eslint: {
            options: {
                configFile: CONFIG_ESLINT
            },
            target: TS_FILES_BLOB
        },
        copy: {
            main: {
                files: [
                    {expand: true, src: ASSETS_SRC, dest: ASSETS_DIST},
                ],
            },
        },
        clean: [DIST_FOLDER, DOCS_DIST, TS_CACHE_DIR],
    })

    // loading tasks
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-ts')
    grunt.loadNpmTasks('grunt-typedoc')
    grunt.loadNpmTasks('grunt-eslint')
    grunt.loadNpmTasks('grunt-contrib-copy')
    grunt.loadNpmTasks('grunt-contrib-clean')

    // default build task
    grunt.registerTask('default', ['eslint', 'ts', 'copy'])

    // dev task
    grunt.registerTask('dev', ['eslint', 'ts', 'typedoc', 'copy'])
}
