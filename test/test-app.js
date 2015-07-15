'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('sv-base:app', function() {
    var files = [
        'bower.json',
        'package.json',
        '.editorconfig',
        '.jshintrc',
        '.jsbeautifyrc',
        '.gitignore'
    ];

    describe('with appname argument', function() {
        before(function(done) {
            helpers.run(path.join(__dirname, '../generators/app'))
                .withOptions({
                    skipInstall: true
                })
                .withArguments(['test_name_arg'])
                .on('end', done);
        });

        it('creates files', function() {
            assert.file(files);
        });

        it('writes appname to package.json', function() {
            assert.fileContent('package.json', /"name": "testNameArg"/);
        });
    });

    describe('with appname prompt', function() {
        before(function(done) {
            helpers.run(path.join(__dirname, '../generators/app'))
                .withOptions({
                    skipInstall: true
                })
                .withPrompts({ packageName: 'test name prompt' })
                .on('end', done);
        });

        it('creates files', function() {
            assert.file(files);
        });

        it('writes appname to package.json', function() {
            assert.fileContent('package.json', /"name": "testNamePrompt"/);
        });
    });
});
