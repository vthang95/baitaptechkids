console.log('Starting app!');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

var argv = yargs.argv;
var command  = argv._[0];

if (command==='play') {
	notes.creatMap();
	notes.randomEnemies();
	notes.tutorial();
} else if (command==='shot') {
	notes.shot(argv.x, argv.y);
} else {
	console.log('Command note recognized!');
}