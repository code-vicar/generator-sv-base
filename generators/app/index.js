'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');

module.exports = yeoman.generators.Base.extend({

    constructor: function() {
        yeoman.generators.Base.apply(this, arguments);

        this.argument('appname', {
            type: String,
            required: false
        });
    },

    prompting: function() {
        var done = this.async();

        this.log(yosay(
            'Welcome to ' + chalk.green('Scott\'s base app') + ' generator!'
        ));

        var appname = _.camelCase(this.appname);

        var prompts = [{
            type: 'input',
            name: 'packageName',
            message: 'App name?',
            default: appname || 'package'
        }];

        this.prompt(prompts, function(props) {
            props.packageName = _.camelCase(props.packageName);
            this.props = props;

            done();
        }.bind(this));
    },

    writing: {
        app: function() {
            this.fs.copyTpl(
                this.templatePath('_package.json'),
                this.destinationPath('package.json'),
                this.props
            );
            this.fs.copyTpl(
                this.templatePath('_bower.json'),
                this.destinationPath('bower.json'),
                this.props
            );
        },

        projectfiles: function() {
            this.fs.copy(
                this.templatePath('editorconfig'),
                this.destinationPath('.editorconfig')
            );
            this.fs.copy(
                this.templatePath('jshintrc'),
                this.destinationPath('.jshintrc')
            );
            this.fs.copy(
                this.templatePath('jsbeautifyrc'),
                this.destinationPath('.jsbeautifyrc')
            );
            this.fs.copy(
                this.templatePath('gitignore'),
                this.destinationPath('.gitignore')
            );
        }
    },

    install: function() {
        this.installDependencies();
    }
});
