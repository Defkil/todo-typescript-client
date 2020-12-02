const typedocConfig = require('./typedoc.json')

module.exports = function(grunt) {
    grunt.config.init({
        pkg: grunt.file.readJSON('package.json'),
        ts: {
            default : {
                tsconfig: './tsconfig.dev.json'
            }
        },
        watch: {
            typescript: { // only typescript
                files: ['src/**/*.ts'],
                tasks: ['ts']
            },
            'ts-doc': { // typescript and typedoc
                files: ['src/**/*.ts'],
                tasks: ['ts', 'typedoc']
            }
        },
        typedoc: {
            build: {
                options: typedocConfig,
                src: 'src/**/*'
            }
        }
    })

    // typescript
    grunt.loadNpmTasks('grunt-ts')
    grunt.registerTask('default', ['ts'])

    // watch handler
    grunt.loadNpmTasks('grunt-contrib-watch')

    // typedoc
    grunt.loadNpmTasks('grunt-typedoc')
}
