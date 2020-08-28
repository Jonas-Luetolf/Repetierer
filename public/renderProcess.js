const ipcRenderer = require('electron').ipcRenderer;
let state = 0; // 0: select file, 1: select class, 2: click start, 3: set grade

// elements
const _minimize = document.getElementById('minimize');
const _quit = document.getElementById('quit');
const _file = document.getElementById('file').children.item(1);
const _classes = document.getElementById('class-list').children.item(0);
const _start = document.getElementById('repetition').children.item(1);
const _name = document.getElementById('name');
const _label = document.getElementById('grade').children.item(0);
const _grade = document.getElementById('grade').children.item(1);
const _cancel = document.getElementById('res').children.item(1);
const _ok = document.getElementById('res').children.item(2);

/*
 * events to main
 */

// minimize
_minimize.addEventListener('click', () => {
	ipcRenderer.send('minimize');
});

// quit
_quit.addEventListener('click', () => {
	ipcRenderer.send('quit');
});

// file
_file.addEventListener('click', () => {
	ipcRenderer.send('file');
});

// class
function classEvent(e) {
	e.addEventListener('click', () => {
		ipcRenderer.send('class', e.innerText);
	});
}

// start
_start.addEventListener('click', () => {
	ipcRenderer.send('start');
});

// cancel
_cancel.addEventListener('click', () => {
	state = 2;
	updateState();
});

// ok
_ok.addEventListener('click', () => {
	let v = parseFloat(_grade.value.replace(',', '.'));
	if (v && v >= 1 && v <= 6)
		ipcRenderer.send('ok', v);
});

/*
 * events from main
 */

// state
ipcRenderer.on('state', (e, a) => {
	state = a;
	updateState();
})

// classes
ipcRenderer.on('classes', (e, a) => {
	state = 1;
	updateState();

	_classes.innerHTML = '';
	for (let i = 0; i < a.length; i++) {
		let x = document.createElement('button')
		x.className = 'btn-2';
		x.innerText = a[i];
		classEvent(x);
		_classes.appendChild(x);
	}
})

// name
ipcRenderer.on('name', (e, a) => {
	state = 3;
	updateState();

	_grade.value = '';
	_name.innerText = a;
	scaleName();
})

/*
 * other
 */

// update the buttons based on the state
function updateState() {
	switch (state) {
		case 0:
		case 1:
			disable(_start);
			disable(_label);
			disable(_grade);
			disable(_cancel);
			disable(_ok);
			text();
			break;
		case 2:
			enable(_start);
			disable(_label);
			disable(_grade);
			disable(_cancel);
			disable(_ok);
			text();
			break;
		case 3:
			enable(_start);
			enable(_label);
			enable(_grade);
			enable(_cancel);
			enable(_ok);
			break;
	}

	function disable(e) {
		if (!e.classList.contains('disabled')) e.classList.add('disabled');
	}

	function enable(e) {
		if (e.classList.contains('disabled')) e.classList.remove('disabled');
	}

	function text() {
		_grade.value = '';
		_name.innerText = 'name';
		scaleName();
	}
}

// scale the name to fit the screen
function scaleName() {
	let x = document.getElementById('name');
	let z = 30; // this value can be changed
	let n = 10 - z/4;
	let s = z/x.innerText.split(' ')[0].length + n;
	x.style.fontSize = s + 'rem';
	x.style.marginTop = (10 - s) + 'rem';
}

// automatically scale the name on load
module.exports = [scaleName(), updateState()];