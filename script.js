// Select task columns
const todo = document.getElementById('todo');
const inProgress = document.getElementById('inProgress');
const done = document.getElementById('done');

//variable to store dragged element
let draggedElement = null;

//Select task cards
const tasks = document.querySelectorAll('.task');

console.log(tasks)

//add drag event to the task 
tasks.forEach(task => {
    task.addEventListener('dragstart', (e) => {
        draggedElement = task;
        
    })
})

function addDragEventsOnColumn(column) {
    //Add dragover event
    column.addEventListener('dragover', (e) => {
        e.preventDefault();
        column.parentElement.classList.add('hoverOver')
    })

    //Add drag leave event
    column.addEventListener('dragleave', (e) => {
        
    column.parentElement.classList.remove('hoverOver')
})

    //Add drop 
    column.addEventListener('drop', (e) => {
        e.preventDefault();
        column.appendChild(draggedElement)
        draggedElement = null;
        column.parentElement.classList.remove('hoverOver')
    })
}

//Drop event


addDragEventsOnColumn(todo)
addDragEventsOnColumn(inProgress)
addDragEventsOnColumn(done)



