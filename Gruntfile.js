const PACKAGE_FILE = 'package.json',
    CONFIG_ESLINT = '.eslintrc.json',
    CONFIG_TS = 'tsconfig.dev.json',
    CONFIG_TYPEDOC = 'typedoc.json',
    TS_FILES_BLOB = ['src/**/*.ts'],
    ASSETS_SRC = ['src/assets/**'],
    ASSETS_DIST = 'src/assets/**'

module.exports = function(grunt) {
    grunt.config.init({
        pkg: grunt.file.readJSON(PACKAGE_FILE),
        ts: {
            default : {
                tsconfig: CONFIG_TS
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
                options: require(CONFIG_TYPEDOC),
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
    })

    // loading tasks
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-ts')
    grunt.loadNpmTasks('grunt-typedoc')
    grunt.loadNpmTasks('grunt-eslint')
    grunt.loadNpmTasks('grunt-contrib-copy')

    // default build task
    grunt.registerTask('default', ['eslint', 'ts', 'copy'])

    // dev task
    grunt.registerTask('dev', ['eslint', 'ts', 'typedoc', 'copy'])

    //todo clean task
}
