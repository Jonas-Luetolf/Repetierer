const { ipcMain, app, BrowserWindow, dialog } = require('electron');
const { setFile, setClass, selectPerson, saveGrade, setJoker } = require('./program.js');

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
	event.sender.send('name', selectPerson());
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
