const { init, read, write_grade, write_joker } = require('./excelReader.js');
let cls;
let persons;
let person;

// set the file
function setFile(file, callback) {
	init(file, (r) => {
		callback(r);
	});
}

// set the class
function setClass(clss, callback) {
	cls = clss;
	persons = read(cls);
	callback(!persons);
}

// select a random person (based on the amount of grades)
function selectPerson() {
	let list = []

	persons.forEach(e => {
		for (let i = 0; i < Math.pow(Math.E, 6 - e.grades) - 1; i++) {
			list.push(e);
		}
	})

	let x = Math.floor(Math.random() * (list.length));
	person = list[x];
	return [person.name, person.joker];
}

// save the new grade to the file
function saveGrade(grade, callback) {
	write_grade(cls, person, grade, (p) => {
		persons = p;
		callback()
	});
}

// save the joker to the file
function setJoker() {
    write_joker(cls, person, (p) => {
        persons  = p;
    });

}

module.exports = {
	setFile: setFile,
	setClass: setClass,
	selectPerson: selectPerson,
	saveGrade: saveGrade,
    setJoker: setJoker
}
