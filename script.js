//store task data in real time
let taskData = {}

// Select task columns
const todo = document.getElementById('todo');
const inProgress = document.getElementById('inProgress');
const done = document.getElementById('done');

//Store tasks in columns
let columns = [todo, inProgress, done]

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
const inputName = document.getElementById('taskName')
const inputDescription = document.getElementById('taskDescription')

// FUNCTIONS START FROM HERE

// To show previous tasks on load
function showPreviousTasks() {
    if (localStorage.getItem('tasks')){
        const data = JSON.parse(localStorage.getItem('tasks'))

        for(const column in data) {
            let columnElement = document.querySelector(`#${column}`)

            data[column].forEach(task => {
                const div = createTask(task.taskName, task.taskDescription)
                columnElement.appendChild(div)
            })
        }

        
    }
    //update count- number of tasks in each column
        updateCount();
}

//Create task function to create and render dom element for each task
function createTask(taskName, taskDescription){
    let div = document.createElement('div')
    let heading = document.createElement('h2')
    let description = document.createElement('span')
    let button = document.createElement('button')
    let innerDiv = document.createElement('div')

    div.className = 'task';
    div.setAttribute('draggable', 'true')
    button.className = 'deleteTaskButton'

    heading.innerText = taskName
    description.innerText = taskDescription
    button.innerText = 'Delete'

    button.addEventListener('click', (e) => {
        deleteTask(e)
    })

    div.appendChild(heading)

    innerDiv.appendChild(description)
    innerDiv.appendChild(button)
    div.appendChild(innerDiv)

    div.addEventListener('dragstart', () => {
        draggedElement = div;
    })

    return div

}


// ADD EVENT LISTENERS ON ALL 3 COLUMNS
//Add drag events on columns
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
        updateLocalStorage();
    })
    
}

// ADD NEW TASK MODAL FUNCTIONS & EVENT LISTENERS

// Toggle add task modal
toggleModalButton.addEventListener('click', () => {
    modal.classList.add('active')
})

// exit modal
modalBg.addEventListener('click', () => {
    modal.classList.remove('active')
})

// Add event listener on Add task Button inside Modal
addTaskButton.addEventListener('click', () => {
    let div = createTask(inputName.value, inputDescription.value)

    todo.appendChild(div);
    modal.classList.remove('active')

    //reset form values
    inputName.value = ''
    inputDescription.value = ''

    updateCount();
    updateLocalStorage();

})


//function update count in columns
function updateCount() {
    columns.forEach(col => {
        const tasks = col.querySelectorAll('.task')
        let count = col.querySelector('.count')

        // taskData[col.id] = Array.from(tasks).map((task) => {
        //     return {
        //         'taskName':task.querySelector('h2').innerText,
        //         'taskDescription':task.querySelector('span').innerText
        //     }
        // })
       
        count.innerText = tasks.length?tasks.length:0
    })
    // localStorage.setItem('tasks', JSON.stringify(taskData))
}

//update local storage when a task is added, moved or deleted
function updateLocalStorage() {
    columns.forEach(col => {
        const tasks = col.querySelectorAll('.task')

        console.log(tasks)

        taskData[col.id] = Array.from(tasks).map((task) => {
            console.log(task)
            return {
                'taskName':task.querySelector('h2').innerText,
                'taskDescription':task.querySelector('span').innerText
            }
        })
    })
    localStorage.setItem('tasks', JSON.stringify(taskData))
    
}

//delete task
function deleteTask(e){
    let task = e.target.closest('.task')
    task.remove()
    updateLocalStorage()
    updateCount()

}

//delete task event listener



showPreviousTasks();
addDragEventsOnColumn(todo);
addDragEventsOnColumn(inProgress);
addDragEventsOnColumn(done);





