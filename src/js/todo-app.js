let todos = [];
let doneTodos = [];

const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
const sections = document.querySelectorAll('.todo-sections button');

todoInput.addEventListener('keyup', (e) => {
	if (todoInput.value && e.keyCode === 13) {
		const item = {
			id: 'todo_' + Date.now(),
			content: todoInput.value
		};
		todos.push(item);
		todoInput.value = '';

		todoList.appendChild(createTodoItem(item));
	}
});

sections.forEach(section => {
	section.addEventListener('click', () => {
		refreshTodoList(section.innerHTML === 'DONE' ? doneTodos : todos);
		section.classList.add('active');
	});
});

function createTodoItem(item) {
	const todo = document.createElement('div');
	todo.classList.add('todo-item');
	todo.classList.add('todo-' + item.id);
	todo.innerHTML = `<span>${item.content}</span>
            <button class="todo-remove" todo="${item.id}">REMOVE</button>
            <button class="todo-change-action" todo="${item.id}">DONE</button>`;
	return todo;
}

document.addEventListener('click', e => {
	const target = e.target;
	const itemId = target.getAttribute('todo');

	if (itemId) {
		if (target.classList.contains('todo-remove')) {
			todos = todos.filter(item => item.id !== itemId);
		} else if (target.classList.contains('todo-change-action')) {
			const doneTodo = todos.find(item => item.id === itemId);

			todos = todos.filter(item => item.id !== itemId);
			doneTodos.push(doneTodo);
		}

		todoList.querySelector('.todo-' + itemId).remove();
	}
});


function refreshTodoList(todos) {
	todoList.innerHTML = '';
	todos.forEach(todo => todoList.appendChild(createTodoItem(todo)));
}
