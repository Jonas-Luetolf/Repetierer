const {BrowserWindow, app} = require('electron');
const {autoUpdater} = require("electron-updater");
require('./src/mainProcess.js');

let win;

// initialize the window
function initWindow() {
	win = new BrowserWindow({
		width: 1100,
		height: 800,
		resizable: false,
		transparent: true,
		frame: false,
		center: true,
		webPreferences: {
			nodeIntegration: true
		},
	});
}

// load the index.html file and display it
function loadHTML() {
	win.loadFile('public/index.html')
}

// close the window
function closeWindow() {
	win = null;
}

// main method
app.on('ready', function() {
	initWindow();
	loadHTML();
	win.on('close', () => {
		closeWindow();
	})
	autoUpdater.checkForUpdatesAndNotify();
});
