const { ipcMain, app, BrowserWindow, dialog } = require('electron');
const { setFile, setClass, selectPerson, saveGrade, setJoker, selectSpecificPerson, getPersons} = require('./program.js');

/*
 * events
 */

// minimize
ipcMain.on('minimize', (event, args) => {
	BrowserWindow.getFocusedWindow().minimize();
});

// quit
ipcMain.on('quit', (event, args) => {
	app.quit();
});

// file
ipcMain.on('file', (event, args) => {
	let file = dialog.showOpenDialogSync(BrowserWindow.getFocusedWindow(), {
		properties: ['openFile'],
		filters: [{ name: 'Excel Dateien (*.xlsx)', extensions: ['xlsx'] }]
	});
	if (file) {
		setFile(file[0], result => {
			event.sender.send('classes', result);
		});
	}
});

// class
ipcMain.on('class', (event, args) => {
	setClass(args, result => {
		event.sender.send('ready', result);
	});
});

// start
ipcMain.on('start', (event, args) => {
	const selectedPerson = selectPerson();
	if (selectedPerson) {
		event.sender.send('name', selectedPerson);
	} else {
		event.sender.send('no-person-available');
	}
});


// get persons list for manual selection
ipcMain.on('get-persons', (event, args) => {
	const persons = getPersons();
	event.sender.send('persons-list', persons);
});

// select specific person
ipcMain.on('select-person', (event, personId) => {
	const result = selectSpecificPerson(personId);
	if (result) {
		event.sender.send('name', result);
	}
});

// ok
ipcMain.on('ok', (event, args) => {
	saveGrade(args, (result) => {
		event.sender.send('finished', result);
	});
});

// joker
ipcMain.on('joker', (event, args) => {
    event.sender.send('finished', setJoker())
});
