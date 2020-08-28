const { ipcMain, app, BrowserWindow, dialog } = require('electron');
const { setFile, setClass, selectPerson, saveGrade } = require('./program.js');

/*
 * events
 */

// minimize
ipcMain.on('minimize', () => {
	BrowserWindow.getFocusedWindow().minimize();
});

// quit
ipcMain.on('quit', () => {
	app.quit();
});

// file
ipcMain.on('file', (e) => {
	let file = dialog.showOpenDialogSync(BrowserWindow.getFocusedWindow(), {
		properties: ['openFile'],
		filters: [{ name: 'Excel Dateien (*.xlsx)', extensions: ['xlsx'] }]
	});
	if (file) {
		setFile(file[0], (a) => {
			e.sender.send('classes', a);
		});
	}
});

// class
ipcMain.on('class', (e, a) => {
	setClass(a, () => {
		e.sender.send('state', 2);
	});
});

// start
ipcMain.on('start', (e) => {
	e.sender.send('name', selectPerson());
});

// ok
ipcMain.on('ok', (e, a) => {
	saveGrade(a, () => {
		e.sender.send('state', 2);
	});
});