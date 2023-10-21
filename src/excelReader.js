const ExcelJS = require('exceljs');
let f;
let wb;
let ws;

// initialize the workbook
function init(file, callback) {
	f = file;
	wb = new ExcelJS.Workbook();
	wb.xlsx.readFile(f)
		.then(() => {
			let worksheets = [];
			wb.worksheets.forEach(v => {
				worksheets.push(v.name);
			})
			callback(worksheets);
		})
		.catch(() => {
			callback();
		})
}

// read and extract persons
function read(clss) {
	ws = wb.getWorksheet(clss);

	// check file
	if (ws.getCell('A1').value !== 'repetierer') return;

	// loop
	let persons = [];
	for (let i = 0; i < 25; i++) {
		let name = ws.getCell('A' + (i + 6));
		if (!name.value) break;
		let grades = countGrades(i)
        let joker = ws.getCell('H' + (i + 6));
        if (grades < 6)
			persons.push({
				id: i,
				name: name.value,
				grades: grades,
                joker: joker.value
			})
	}

	if (persons.length === 0) return;

	return persons;

	function countGrades(i) {
		let n = 0;
		[1,2,3,4,5,6].map(x => {
			if (ws.getCell(i + 6, x + 1).value) n++;
		});
		return n;
	}
}

// write grade to file
function write_grade(clss, person, grade, callback) {

	// check file
	if (ws.getCell('A1').value !== 'repetierer') { callback(); return; }

	ws.getCell(person.id + 6, person.grades + 2).value = grade;

	// TODO: improve this
	wb.xlsx.writeFile(f)
		.then(() => init(f, (a) => {
			if (a)
				callback(read(clss)) // read file again
			else // init error
				callback();
		}))
		.catch(() => callback()); // can't write
}
function write_joker(clss, person, callback) {

	// check file
	if (ws.getCell('A1').value !== 'repetierer') { callback(); return; }
    
    if (ws.getCell('H' + (person.id + 6)).value === 1) {callback; return;}
	ws.getCell('H' + (person.id + 6)).value = 1;

	// TODO: improve this
	wb.xlsx.writeFile(f)
		.then(() => init(f, (a) => {
			if (a)
				callback(read(clss)) // read file again
			else // init error
				callback();
		}))
		.catch(() => callback()); // can't write
}
module.exports = {
	init: init,
	read: read,
	write_grade: write_grade,
    write_joker: write_joker
}
