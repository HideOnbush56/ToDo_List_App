const ToDoValue = document.getElementById("add-list"),
    listItems = document.getElementById("list"),
    addNewTask = document.getElementById("add");

ToDoValue.addEventListener("keypress",function(e){
    if(e.key ==="Enter"){
        addNewTask.click();
    }

})
function listCreate(){
    if(ToDoValue.value == "")
    {alert("Please Enter your task");
    ToDoValue.focus();
    return;
    }
    const taskData = {
        task: ToDoValue.value
    };
    fetch('/api/addTask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Task added successfully:', data);
    })
    .catch(error => {
        console.error('Error adding task:', error);
    });
    ToDoValue.value = "";
}

function fetchTasksFromBackend() {
    fetch('/api/getTasks')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Tasks retrieved successfully:', data);
        visualizeTasks(data.tasks);
    })
    .catch(error => {
        console.error('Error fetching tasks:', error);
    });
}

function visualizeTasks(tasks) {
    const listItems = document.getElementById("list");
    listItems.innerHTML = "";
    tasks.forEach(task => {
        const listItem = document.createElement("li");
        listItem.textContent = task.task;
        listItems.appendChild(listItem);
    });
}
fetchTasksFromBackend();