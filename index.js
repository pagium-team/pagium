"use strict";

var program = require("commander");
var initCommand = require("pagium-command-init");
var releaseCommand = require("pagium-command-release");
var serverCommand = require("pagium-command-server");

var globalConfig = require("./config/global.js");
var projectConfig = require("./package.json");

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
            .version('0.0.1')
            .option('-i, --init', 'init pagium development environment ')
            .option('-r, --release', 'packing pagium program ')
            .option('-w, --watch', 'watching pagium program ')
            .option('-l, --live', 'Live pagium program ');


        program.on('--help', function () {
            console.log('  Examples:');
            console.log('');
            console.log('    $ pagium --help');
            console.log('    $ pagium -h');
            console.log('');
        });

        program.parse(process.argv);


        if (program.init) {
            console.log('  - init');
            initCommand.run();
        }else if
         (program.release) {
            releaseCommand.run(globalConfig.path);
            if (program.live) {
                console.log("live!");
            }
        }
        else if (program.watch) {
            console.log('  - watch');
            serverCommand.run(globalConfig.path, function (callback) {
                releaseCommand.run(globalConfig.path, {
                    callback: callback
                });
            });
        }else{
            console.log("no command!");
            process.exit(1);
        }



    }
}