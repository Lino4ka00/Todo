let ddBtn = document.querySelector('.dd_btn');
let ddContent = document.querySelector('.dd_content');

function hideDD() {
    ddContent.style.display = 'none'
}

function showDD() {
    ddContent.style.display = 'flex'
}

ddBtn.addEventListener('mouseenter', showDD)
ddBtn.addEventListener('mouseleave', function(e){
    if (!ddContent.contains(e.eventTarget)){
        hideDD();
    }
});

ddContent.addEventListener('mouseenter', showDD)
ddContent.addEventListener('mouseleave', function(e){
    if (!ddBtn.contains(e.eventTarget)){
        hideDD();
    }
});

let ddItem = document.querySelectorAll('.dd_item');
let btnDDText = document.querySelector('.btn_text');

ddItem.forEach(function(item){
    item.addEventListener('click', () => {
        const newText = item.textContent;
        btnDDText.textContent = newText;
    })
});

let themeBtn = document.querySelector('.theme');
let themeIcon = document.querySelector('#themeIcon');

themeBtn.addEventListener('click', () => {
    const currentSrc = themeIcon.getAttribute('src');
    const newSrc = currentSrc === "img/icons/dark_theme.svg" ? 'img/icons/light_theme.svg' : 'img/icons/dark_theme.svg'
    themeIcon.setAttribute('src', newSrc);

    let lightThemeLink = document.getElementById('lightTheme');
    let darkThemeLink = document.getElementById('darkTheme');

    if (darkThemeLink) {
        darkThemeLink.parentNode.removeChild(darkThemeLink);
    } else {
        let link = document.createElement('link');
        link.id = 'darkTheme';
        link.rel = 'stylesheet';
        link.href = 'dark.css';
        document.head.appendChild(link);
    }
})


//....................... Модалка

let btnModal = document.querySelector('.open_Modal');
let modal = document.querySelector('.modal');
let cancelBtn = document.querySelector('.cancel')

btnModal.addEventListener('click', () => {
    modal.style.display = 'block'
})

function hideModal() {
    modal.style.display = 'none'
}

cancelBtn.addEventListener('click', hideModal)

window.addEventListener('click', (e) => {
    if (e.target == modal){
        hideModal()
    }
})

//............ Добавление таска


let todoList = document.querySelector('.tasks_list')
let applyBtn = document.querySelector('.apply');
let taskInput = document.querySelector('.modalInput');

applyBtn.addEventListener('click', () => addTodo());


const todos = [];
const tempDeletedTodos = [];
let currentFilter = 'all'


//Фильтр
document.querySelectorAll('.dd_item').forEach(filter => {
    filter.addEventListener('change', (e) => {
        currentFilter = e.target.value;
        console.log(currentFilter);
        renderTodos();
    });
});

//поиск
let searchQuery = '';
let searchInput = document.querySelector('.search_input');
searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim().toLowerCase();
    renderTodos();
});

function addTodo() {
    let todoName = taskInput.value.trim();
    if (todoName) {
        const newTodo = {
            name: todoName,
            id: randomId(),
            completed: false
        }
        todos.push(newTodo);
        renderTodos();
        taskInput.value = '';
        hideModal();
    } else {
        taskInput.focus()
    }
}


function randomId() {
    return Math.floor(Math.random() * 1000);
}

function createTodo(todo) {
    const li = document.createElement('li');
    li.classList.add('task_item');
    li.setAttribute('id', todo.id);
    li.innerHTML = `
        <div class="wrap_title_item">
            <input type="checkbox" name="" id="checkbox" class="todo_completed" ${todo.completed ? 'checked' : ''}>
            <label for="checkbox${todo.id}" class="custom_checkbox">
                <span class="todo_name" ${todo.completed ? 'completed' : ''}>${todo.name}</span>
            </label>
        </div>
        <div class="wrap_btn_TL">
            <button class="edit">
                <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.67272 3.49106L1 10.1637V13.5H4.33636L11.0091 6.82736M7.67272 3.49106L10.0654 1.09837L10.0669 1.09695C10.3962 0.767585 10.5612 0.602613 10.7514 0.540824C10.9189 0.486392 11.0993 0.486392 11.2669 0.540824C11.4569 0.602571 11.6217 0.767352 11.9506 1.09625L13.4018 2.54738C13.7321 2.87769 13.8973 3.04292 13.9592 3.23337C14.0136 3.40088 14.0136 3.58133 13.9592 3.74885C13.8974 3.93916 13.7324 4.10414 13.4025 4.43398L13.4018 4.43468L11.0091 6.82736M7.67272 3.49106L11.0091 6.82736" stroke="#CDCDCD" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <button class="delete">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.87426 7.61505C3.80724 6.74386 4.49607 6 5.36983 6H12.6302C13.504 6 14.1928 6.74385 14.1258 7.61505L13.6065 14.365C13.5464 15.1465 12.8948 15.75 12.1109 15.75H5.88907C5.10526 15.75 4.4536 15.1465 4.39348 14.365L3.87426 7.61505Z" stroke="#CDCDCD"/>
                    <path d="M14.625 3.75H3.375" stroke="#CDCDCD" stroke-linecap="round"/>
                    <path d="M7.5 2.25C7.5 1.83579 7.83577 1.5 8.25 1.5H9.75C10.1642 1.5 10.5 1.83579 10.5 2.25V3.75H7.5V2.25Z" stroke="#CDCDCD"/>
                    <path d="M10.5 9V12.75" stroke="#CDCDCD" stroke-linecap="round"/>
                    <path d="M7.5 9V12.75" stroke="#CDCDCD" stroke-linecap="round"/>
                </svg>
            </button>
        </div>
        <div class="divider"></div>
    `
    const completedCheckbox = li.querySelector('.todo_completed');
    const removeBtn = li.querySelector('.delete');
    const editBtn = li.querySelector('.edit');

    completedCheckbox.addEventListener('change', () => toggleComplete(todo.id));
    removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();  
        removeTodo(todo.id);
    });
    editBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        editTodo(todo.id);
    });
    return li;
}


function toggleComplete(id) {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        renderTodos();
    }
}



function removeTodo(id) { 
    const index = todos.findIndex(todo => todo.id === id);
    if (index !=  -1) {
        const tempDeletedTodo = todos.splice(index, 1)[0];
        tempDeletedTodos.push(tempDeletedTodo);
        renderTodos();

        const undoMessage = document.createElement('div');
        undoMessage.classList.add('undo_message');
        undoMessage.innerHTML = `
                <button class="undo">
                <span class="timerSpan">3</span>
                    Undo
                    <img src="img/icons/undo.svg" alt="">
                </button>
        `;
        const messages = document.querySelector('.undo_messages');
        messages.appendChild(undoMessage);

        const undoBtn = undoMessage.querySelector('.undo');
        undoBtn.addEventListener('click', () => undoDelete(tempDeletedTodo.id, undoMessage));

        initTimer(undoMessage, tempDeletedTodo.id);
    }
}

function undoDelete(id, undoMessage) {
    const index = tempDeletedTodos.findIndex(todo => todo.id === id);
    if (index !== -1) {
        const restoredTodo = tempDeletedTodos.splice(index, 1)[0];
        todos.push(restoredTodo);
        renderTodos();
        clearTimeout(undoMessage.timeoutId);
        if (undoMessage.parentElement) {
            undoMessage.parentElement.removeChild(undoMessage); //!--------------------------------------------
        }
    }
}


function initTimer(undoMessage, id) {
    let seconds = 3;
    const timerSpan = undoMessage.querySelector('.timerSpan');
    timerSpan.textContent = seconds;
    const timer = setInterval(() => {
        seconds -= 1;
        timerSpan.textContent = seconds;
        if (seconds <= 0) {
            clearInterval(timer);
            const index = tempDeletedTodos.findIndex(todo => todo.id === id);
            if (index !== -1) {
                tempDeletedTodos.splice(index, 1);
            }
            if (undoMessage.parentElement) {
                undoMessage.parentElement.removeChild(undoMessage);
            }
        }
    }, 1000);

    undoMessage.timeoutId = timer; //!------------------------------------------------
}


function editTodo(id) {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        const li = document.getElementById(id);
        const todoNameSpan = li.querySelector('.todo_name');
        todoNameSpan.innerHTML = `
            <input type="text" class="edit-input" value="${todo.name}">
            <button class="save-edit">Save</button>
        `

        const saveBtn = li.querySelector('.save-edit');
        saveBtn.addEventListener('click', () => saveEdit(todo.id));
    }
}

function saveEdit(id) {
    const li = document.getElementById(id);
    const editInput = li.querySelector('.edit-input');
    const newTodoName = editInput.value.trim();

    if (newTodoName) {
        const todo = todos.find(todo => todo.id === id);
        if (todo) {
            todo.name = newTodoName;
            renderTodos()
        }
    }
}

function renderTodos() {
    todoList.innerHTML = '';
    let filteredTodos = todos;
    if (currentFilter === "completed") {
        filteredTodos = todos.filter(todo => todo.completed);
    } else if (currentFilter === 'uncompleted') {
        filteredTodos = todos.filter(todo => !todo.completed);
    } else {
        filteredTodos = todos;
    }

    if (searchQuery) {
        filteredTodos = filteredTodos.filter(todo => todo.name.toLowerCase().includes(searchQuery))
    }

    filteredTodos.forEach(todo => {
        let todoElement = createTodo(todo);
        todoList.appendChild(todoElement);
    })

    if (filteredTodos.length === 0) {
        let zeroContent = document.createElement('div');
        zeroContent.classList.add('zeroContent');
        zeroContent.textContent = 'Empty...'
        let img = document.createElement('img');
        img.setAttribute('src', "img/empy_light.png");
        zeroContent.appendChild(img);
        todoList.appendChild(zeroContent);
        todoList.style.display = 'flex';
        todoList.style.justifyContent = "center";
    } else {
        todoList.style.display = 'block';
    }
}

renderTodos()
