module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ts: {
            default : {
                tsconfig: './tsconfig.dev.json'
            }
        },
        watch: {
            typescript: {
                files: ['src/**/*.ts'],
                tasks: ['ts']
            }
        }
    });

    grunt.loadNpmTasks('grunt-ts');
    grunt.registerTask('default', ['ts']);

    grunt.loadNpmTasks('grunt-contrib-watch');
};
