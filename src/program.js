let file;
let person;

function setFile(file, callback) {
	this.file = file;
	callback(['Klasse 5c', 'Klasse 6c']);
}

function setClass(clss, callback) {
	callback();
}

function selectPerson() {
	person = "aaaaa";
	return person;
}

function saveGrade(grade, callback) {
	callback();
}

// person object
class Person {
	constructor() {

	}
}

module.exports = {
	setFile: setFile,
	setClass: setClass,
	selectPerson: selectPerson,
	saveGrade: saveGrade
}