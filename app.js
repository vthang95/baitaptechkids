console.log('Starting app!');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');


var argv = yargs.argv;
var command  = argv._[0];
// console.log(yargs.argv);
// console.log('Command:' + command);
if (command==='play') {
	notes.creatMap();
	notes.randomEnemies();
	notes.tutorial();
} else if (command==='shot') {
	notes.shot(argv.x, argv.y);
	// notes.randomEnemies();
}
// if (command === 'add') {
// 	notes.addNote(argv.title, argv.body);
// } else if (command === 'list') {
// 	notes.getAll();
// } else if (command === 'remove') {
// 	notes.removeNote(argv.title);
// } else if (command === 'read') {
// 	notes.read(argv.title);
// } else {
// 	console.log('command not recognized!')
// }

// var mapString = fs.readFileSync('data.json');
// var map = JSON.parse(mapString);
// console.log(map);