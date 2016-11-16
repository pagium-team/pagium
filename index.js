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
	run: function(argv) {
		program
			.version(projectConfig.version);
		 
		program
			.command("init")
			.description("run init commands")
			.action(function() {
				initCommand.run();
			});

		program
			.command("release")
			.description("run release commands")
			.action(function() {
				console.log(process.cwd());
				releaseCommand.run(globalConfig.path);
			});

		program.parse(argv);
	}
}