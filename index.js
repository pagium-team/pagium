"use strict";

var program = require("commander");
var cliCommand = require("pagium-command-cli");
var releaseCommand = require("pagium-command-release");
var serverCommand = require("pagium-command-server");
var Alphabet = require('alphabetjs');
var colors = require("colors");

var globalConfig = require("./config/global.js");
var projectConfig = require("./package.json");
var versionStr = require('./version.js');

/**
 * pagium 入口文件
 *
 * @author sam.sin
 * @class index
 * @constructor
 */
module.exports = {
    run: function (argv) {
        program
            .version(Alphabet('PAGIUM','stereo')+'\n v0.0.1')
            .option('-i, --init', 'init pagium development environment ')
            .option('-r, --release', 'packing pagium program ')
            .option('-o, --optimize', 'pagium program optimize')
            .option('-s, --server', 'running pagium server ')
            .option('-w, --watch', 'watch pagium server ')
            .option('-l, --live', 'live reload pagium program ');


        program.on('--help', function () {
            console.log('  Examples:');
            console.log('');
            console.log('    $ pagium --help');
            console.log('    $ pagium -h');
            console.log('');
        });

        program.parse(process.argv);

        if (program.init) {
            cliCommand.run();
        } else if (program.release) {
            releaseCommand.run(globalConfig.path, {
                optimize: program.optimize? true : false,
                callback: function() {
                    process.exit(1);
                }
            });
        } else if (program.server) {
            var params = {
                live: program.live? true : false, // for sb
                watch: program.watch? true : false, // for sb
                onFileChange: function(callback) {
                    releaseCommand.run(globalConfig.path, {
                        live: program.live,
                        optimize: program.optimize? true : false,
                        callback: callback
                    });
                }
            };
            releaseCommand.run(globalConfig.path, {
                optimize: program.optimize? true : false,
                callback: function() {
                    serverCommand.run(globalConfig.path, params);
                }
            });
            
        } else {
            console.log("no command!");
            process.exit(1);
        }
    }
}