const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const filterBtns = document.querySelectorAll('.filter-btn');

let tasks = [];
let currentFilter = 'all';

const savedTasks = localStorage.getItem('myToDoList');
if (savedTasks) {
    tasks = JSON.parse(savedTasks);
}

renderTasks();

taskInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        const text = taskInput.value.trim();
        if (text !== "") {
            addTask(text);
            taskInput.value = "";
        }
    }
});

function addTask(text) {
    const now = new Date();
    const dateString = now.toLocaleDateString('uk-UA', {
        day: '2-digit', month: '2-digit', year: '2-digit'
    }) + ', ' + now.toLocaleTimeString('uk-UA', {
        hour: '2-digit', minute: '2-digit'
    });

    const newTask = {
        id: Date.now(),
        text: text,
        date: dateString,
        done: false
    };

    tasks.unshift(newTask);
    saveToLocalStorage();
    renderTasks();
}

function saveToLocalStorage() {
    localStorage.setItem('myToDoList', JSON.stringify(tasks));
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');

        currentFilter = btn.dataset.filter;
        renderTasks();
    });
});

function renderTasks() {
    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if (currentFilter === 'active') {
        filteredTasks = tasks.filter(t => !t.done);
    } else if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(t => t.done);
    }

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        if (task.done) {
            li.classList.add('done');
        }
        li.dataset.id = task.id;

        li.innerHTML = `
            <div class="task-left">
                <input type="checkbox" ${task.done ? 'checked' : ''}>
                <span class="task-content">
                    <span class="task-text">${task.text}</span>
                    <span class="task-date">(${task.date})</span>
                </span>
            </div>
            <span class="delete-btn">X</span>
        `;

        const checkbox = li.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', () => {
            task.done = checkbox.checked;
            saveToLocalStorage();
            renderTasks();
        });

        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            tasks = tasks.filter(t => t.id !== task.id);
            saveToLocalStorage();
            renderTasks();
        });

        const taskTextSpan = li.querySelector('.task-text');
        taskTextSpan.addEventListener('dblclick', () => {
            const currentText = task.text;
            const inputEdit = document.createElement('input');
            inputEdit.type = "text";
            inputEdit.value = currentText;
            inputEdit.className = "edit-input";

            taskTextSpan.replaceWith(inputEdit);
            inputEdit.focus();

            inputEdit.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    const newText = inputEdit.value.trim();
                    if (newText) {
                        task.text = newText;
                        saveToLocalStorage();
                        renderTasks();
                    }
                }
            });

            inputEdit.addEventListener('blur', () => {
                renderTasks();
            });
        });

        taskList.appendChild(li);
    });
}