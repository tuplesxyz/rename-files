#!/usr/bin/env node

/**
 * batch-rename-lesson-files
 * a cli to batch rename files
 *
 * @author tuples <https://www.tuples.dev>
 */

const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');
const fs = require('fs');

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

const fileOfNames = input[0];
const currentFileName = input[1];
(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);
	try {
		// read contents of the file
		const data = fs.readFileSync(fileOfNames, 'UTF-8');

		// split the contents by new line
		const lines = data.split(/\r?\n/);

		// print all lines
		lines.forEach(async (line,i) => {
			await fs.rename(`${currentFileName}${i + 1}.mp4`, `${i + 1}_${line.replace(/[:\/]/g,''}.mp4`, function(err) {
				if ( err ) console.log('ERROR: ' + err);
			});
		});
	} catch (err) {
		console.error(err);
	}

	debug && log(flags);
})();
