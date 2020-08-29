const { init, read, write } = require('./excelReader.js');
let cls;
let persons;
let person;

// set the file
function setFile(file, callback) {
	init(file, (r) => {
		callback(r);
	})
}

// set the class
function setClass(clss, callback) {
	cls = clss;
	persons = read(cls);
	callback();
}

// select a random person (based on the amount of grades)
function selectPerson() {
	let list = []

	persons.forEach(e => {
		for (let i = 0; i < Math.pow(6 - e.grades, 4) / 20; i++) {
			list.push(e);
		}
	})
	console.log(list);
	let x = Math.floor(Math.random() * (list.length));
	person = list[x];
	return person.name;
}

// save the new grade to the file
function saveGrade(grade, callback) {
	write(cls, person, grade, (p) => {
		persons = p;
		callback()
	});
}

module.exports = {
	setFile: setFile,
	setClass: setClass,
	selectPerson: selectPerson,
	saveGrade: saveGrade
}