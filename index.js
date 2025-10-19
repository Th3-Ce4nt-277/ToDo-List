'use strict';
function startStorage() {
	if (!localStorage.getItem('TodoData')) {
		localStorage.setItem(
			'TodoData',
			JSON.stringify({ theme: 'dark', tasks: [] })
		);
	}
}

var taskToEdit = 0;
const data = JSON.parse(localStorage.getItem('TodoData'));

function switchTheme(state) {
	let icon = {
		light: 'assets/sun.svg',
		dark: 'assets/moon.svg'
	};

	if (state === 'switching') {
		data.theme = data.theme === 'light' ? 'dark' : 'light';
		localStorage.setItem('TodoData', JSON.stringify(data));
	}

	document.getElementById('theme').src = icon[data.theme];
	document.body.className = data.theme;
}

function createTask(task, completed, index) {
	document.getElementById('task-space').insertAdjacentHTML(
		'beforebegin',
		`
		<li class="task ${completed ? 'completed' : ''}" id="task-${index}">
			<div>
				<button class="checkbox" onClick="completeTask(${index})">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 465.822 465.822">
						<g>
							<path

								d="M5.988,289.981l88.875,88.875c24.992,24.984,65.504,24.984,90.496,0l274.475-274.475c8.185-8.475,7.95-21.98-0.525-30.165   c-8.267-7.985-21.374-7.985-29.641,0L155.194,348.691c-8.331,8.328-21.835,8.328-30.165,0l-88.875-88.875   c-8.475-8.185-21.98-7.95-30.165,0.525C-1.996,268.608-1.996,281.714,5.988,289.981L5.988,289.981z" />
						</g>
					</svg>
				</button>
				<span>
					${task}
				</span>
			</div>
			<div>
				<button class="btn-editTask" onClick="openEditModal(${index})">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
						<path
							d="M1.172,19.119A4,4,0,0,0,0,21.947V24H2.053a4,4,0,0,0,2.828-1.172L18.224,9.485,14.515,5.776Z" />
						<path
							d="M23.145.855a2.622,2.622,0,0,0-3.71,0L15.929,4.362l3.709,3.709,3.507-3.506A2.622,2.622,0,0,0,23.145.855Z" />
					</svg>
				</button>
				<button class="btn-deleteTask" onClick="removeTask(${index})">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20">
						<path
							d="M448,85.333h-66.133C371.66,35.703,328.002,0.064,277.333,0h-42.667c-50.669,0.064-94.327,35.703-104.533,85.333H64   c-11.782,0-21.333,9.551-21.333,21.333S52.218,128,64,128h21.333v277.333C85.404,464.214,133.119,511.93,192,512h128   c58.881-0.07,106.596-47.786,106.667-106.667V128H448c11.782,0,21.333-9.551,21.333-21.333S459.782,85.333,448,85.333z    M234.667,362.667c0,11.782-9.551,21.333-21.333,21.333C201.551,384,192,374.449,192,362.667v-128   c0-11.782,9.551-21.333,21.333-21.333c11.782,0,21.333,9.551,21.333,21.333V362.667z M320,362.667   c0,11.782-9.551,21.333-21.333,21.333c-11.782,0-21.333-9.551-21.333-21.333v-128c0-11.782,9.551-21.333,21.333-21.333   c11.782,0,21.333,9.551,21.333,21.333V362.667z M174.315,85.333c9.074-25.551,33.238-42.634,60.352-42.667h42.667   c27.114,0.033,51.278,17.116,60.352,42.667H174.315z"
						/>
					</svg>
				</button>
			</div>
		</li>`
	);
}

function loadTasks() {
	document.querySelector('.task-list').innerHTML =
		'<li class="task" id="task-space"></li>';

	data.tasks.forEach((task, i) => {
		createTask(task.title, task.completed, i);
	});
}

function addTask(task) {
	if (task.value !== '') {
		createTask(task.value, false, data.tasks.length);
		data.tasks.push({ title: task.value, completed: false });
		localStorage.setItem('TodoData', JSON.stringify(data));
		task.value = '';
	}
	console.log(data.tasks.length);
}

function completeTask(i) {
	data.tasks[i].completed = !data.tasks[i].completed;
	localStorage.setItem('TodoData', JSON.stringify(data));
	let target = document.getElementById(`task-${i}`);

	if (!data.tasks[i].completed)
		return target.classList.remove('completed');

	if (data.tasks[i].completed)
		return target.classList.add('completed');
}

function removeTask(index) {
	data.tasks.splice(index, 1);
	localStorage.setItem('TodoData', JSON.stringify(data));
	loadTasks();
}

function openEditModal(index) {
	const modalBlur = document.querySelector('.modalBlur');
	modalBlur.style.top = '0px';
	modalBlur.style.opacity = '1';

	taskToEdit = index;

	document.getElementById(
		'editingTask'
	).innerHTML = `You are editing the task <strong>"${data.tasks[index].title}"</strong>`;
}

function closeEditModal() {
	document.getElementById('txt-editTask').value = '';

	document.querySelector('.modalBlur').style.opacity = '0';
	setTimeout(() => {
		document.querySelector('.modalBlur').style.top = '100vh';
	}, 300);
}

function editTasks() {
	const txtEdit = document.getElementById('txt-editTask');

	data.tasks[taskToEdit].title = txtEdit.value;

	localStorage.setItem('TodoData', JSON.stringify(data));

	txtEdit.value = '';

	loadTasks();
	closeEditModal();
}

function loadData() {
	startStorage();
	switchTheme();
	loadTasks();
}
