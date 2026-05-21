

// Select task columns
const todo = document.getElementById('todo');
const inProgress = document.getElementById('inProgress');
const done = document.getElementById('done');

//variable to store dragged element
let draggedElement = null;

//Select task cards
const tasks = document.querySelectorAll('.task');

//Select buttons
const toggleModalButton = document.getElementById('toggleModalButton');

// Select modal elements
const modal = document.querySelector('.modal');
const modalBg = document.querySelector('.bg');
const addTaskButton = document.getElementById('addTaskButton')
const taskName = document.getElementById('taskName')
const taskDescription = document.getElementById('taskDescription')

// Toggle add task modal
toggleModalButton.addEventListener('click', () => {
    modal.classList.add('active')
})

// exit modal
modalBg.addEventListener('click', () => {
    modal.classList.remove('active')
})

// Add task
addTaskButton.addEventListener('click', () => {
    let div = document.createElement('div')
    let heading = document.createElement('h2')
    let description = document.createElement('div')
    let button = document.createElement('button')
    let innerDiv = document.createElement('div')

    div.className = 'task';
    div.setAttribute('draggable', 'true')
    button.className = 'deleteTaskButton'

    heading.innerText = taskName.value 
    description.innerText = taskDescription.value 
    button.innerText = 'Delete'

    div.appendChild(heading)

    innerDiv.appendChild(description)
    innerDiv.appendChild(button)
    div.appendChild(innerDiv)

    div.addEventListener('dragstart', () => {
        draggedElement = div;
    })

    //reset form values
    taskName.value = ''
    taskDescription.value = ''

    todo.appendChild(div);
    modal.classList.remove('active')

    updateCount();

})
console.log(tasks)

//function update count in columns
function updateCount() {
    [todo, inProgress, done].forEach(col => {
        const tasks = col.querySelectorAll('.task')
        let count = col.querySelector('.count')

        count.innerText = tasks.length
    })
}

//add drag event to the task 
tasks.forEach(task => {
    task.addEventListener('dragstart', () => {
        draggedElement = task;
    })
})

function addDragEventsOnColumn(column) {
    //Add dragover event
    column.addEventListener('dragover', (e) => {
        e.preventDefault();
        column.classList.add('hoverOver')
    })

    //Add drag leave event
    column.addEventListener('dragleave', (e) => {
        
    column.classList.remove('hoverOver')
})

    //Add drop 
    column.addEventListener('drop', (e) => {
        e.preventDefault();
        column.appendChild(draggedElement);
        draggedElement = null;
        column.classList.remove('hoverOver');

        updateCount();
    })
}

//Drop event


addDragEventsOnColumn(todo);
addDragEventsOnColumn(inProgress);
addDragEventsOnColumn(done);
updateCount();



