const ExcelJS = require('exceljs');
let f;
let wb = new ExcelJS.Workbook();
let ws;

// initialize the workbook
function init(file, callback) {
	f = file;
	wb.xlsx.readFile(f).then(() => {
		let r = []
		wb.worksheets.forEach(v => {
			r.push(v.name);
		})
		callback(r);
	});
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
		let grades = ws.getCell('J' + (i + 6));

		if (!name.value) break;

		if (grades.result < 6)
			persons.push({
				id: i,
				name: name.value,
				grades: grades.result
			});
	}

	return persons;
}

// write grade to file
function write(clss, person, grade) {

	// check file
	if (ws.getCell('A1').value !== 'repetierer') return;

	//XLSX.utils.sheet_add_aoa(worksheet, [[grade]], {origin: 'A2'});

	//XLSX.writeFile(workbook, f);
}

module.exports = {
	init: init,
	read: read,
	write: write
}
