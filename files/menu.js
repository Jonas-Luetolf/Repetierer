const remote = require('electron').remote;

document.getElementById('minimize').addEventListener('click', () => {
	remote.getCurrentWindow().minimize();
});

/*document.getElementById('maximize').addEventListener('click', () => {
	const currentWindow = remote.getCurrentWindow();
	if(currentWindow.isMaximized()) {
		currentWindow.unmaximize();
	} else {
		currentWindow.maximize();
	}
});*/

document.getElementById('quit').addEventListener('click', () => {
	remote.app.quit();
});