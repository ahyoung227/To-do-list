import 'babel-polyfill';
import { formatDistance, subDays, format } from 'date-fns'

//place for save tasksets and subtasks object
let taskSets = [];

//factory function for taskset and subtask object
let taskSet = (title) => {
    let subTasks = []

    let addTasks = (subTask) => {
    subTasks.push(subTask) }

    return { title, subTasks, addTasks }
}

//making a object for subtask
let subTask = (title, done, priority, duedate) => {
    return {title, done, priority, duedate}
}

//showing whether they have completed or not
// let toggleDone = (taskItem) => {
//     if (taskItem.done) {
//         taskItem.done == false
//     } else {
//         taskItem.done == true
//     }
// }

export { taskSets, taskSet, subTask }


////////////////////////////////////

//task-set creation form(default)
let addTask = document.querySelector(".add-task");
addTask.style.display= "none";

//task-set creation form(open)
let taskPlus= document.getElementById("plus"); 
taskPlus.addEventListener('click', () => {
    addTask.style.display= "block"
    taskCreation.style.display = "none";
    inputButtons.style.display = "none";

    });

//task-set creation form(add button)
let setButton = document.getElementById('title-button');
setButton.addEventListener('click', () => {
    let setInput = document.getElementById('title-input').value;
    let newTaskSet = taskSet(setInput);
    taskSets.push(newTaskSet);
    addTask.style.display= "none";
    renderTaskSets();
    document.getElementById('title-input').value = "";
    setIndex = taskSets.length -1
});

//task-set creation form(close button)
let cancelButton = document.getElementById('title-cancel-button');
cancelButton.addEventListener('click', () => {
    addTask.style.display= "none"
    });

//display task-set in the sidebar
function renderTaskSets() {
    let sidebar = document.querySelector('.card-area');
    sidebar.innerHTML = "";
        for (var i= 0; i < taskSets.length; i++) {
            sidebar.innerHTML += 
            `<div class="card taskli" onclick="editTasks(event)" data-index=${i}>   
                <div class="edit">
                    <i class='fas fa-edit' style='font-size:15px' onclick="editSet(event)"></i>
                    <i class='fas fa-trash' style='font-size:15px' onclick="deleteSet(event)"></i>
                </div>
                <h1 id="title" onclick="editTasks(event)" data-index=${i}>${taskSets[i].title}</h1>
            </div>`;
        }
}

//delete task-set in the sidebar and the array
window.deleteSet = function(e) {
    let setIndex = e.path[0].dataset.index;
    taskSets.splice([setIndex], 1);
    renderTaskSets()
    editTask.style.display= "none";
}

//task-set add button
let editTask= document.querySelector('.edit-task');
editTask.style.display= "none";
let taskSetId;

window.editSet = function(e) {
    editTask.style.display= "block"
    let setIndex = e.path[2].dataset.index;
    taskSetId = setIndex;
}

let setEditButton = document.getElementById('edit-title-button');
let setCancelButton = document.getElementById('edit-title-cancel-button');

//edit task set
setEditButton.addEventListener("click", () => {
    let setInput = document.getElementById('edit-title-input').value;

    if (setInput == "") {
        editTask.style.display= "none";
        return
    } else {taskSets[taskSetId].title = setInput;
    renderTaskSets()
    editTask.style.display= "none";}
})

setCancelButton.addEventListener("click", () => {
    editTask.style.display= "none";
})

//popup task-set creation form default
let taskCreation = document.querySelector(".task-creation");
let inputButtons = document.querySelector(".input-buttons");
taskCreation.style.display = "none";
inputButtons.style.display = "none";

//add subtask button and show slot
let addButton = document.querySelector('.add-button');
addButton.addEventListener('click', () => {
    if (taskSets.length == 0) {
        alert("Create task-set first")
    } else {
    taskCreation.style.display = "flex";
    inputButtons.style.display = "flex";
    }
});

//date picker in the sub-task creation form
(function () {
    const input = document.getElementById('my-input');
    const datepicker = new TheDatepicker.Datepicker(input);
    datepicker.render();
})();


let setIndex;
//
window.editTasks = function(e) {

    if ((e.target.className == "fas fa-edit") || (e.target.className == "fas fa-trash") || (e.target.className == "edit")) {
        return
    } else {
    setIndex = e.target.dataset.index;
    renderSubTasks();
    }
}

//press sub-task button
window.addSubTask = function() {

    let priority = document.getElementById("priority").value;
    let taskInput = document.getElementById('task-input').value;
    let date = document.getElementById('my-input').value;
    let selectedSet = taskSets[setIndex];
    if ((priority == "") || (taskInput == "") || (date == "")) {
        alert("fill out all fields")
    } else {
    selectedSet.addTasks(subTask(taskInput, false, priority, date));
    
    renderSubTasks(setIndex);
    document.getElementById("priority").value = "";
    document.getElementById('task-input').value = "";
    document.getElementById('my-input').value = "";
    taskCreation.style.display = "none";
    inputButtons.style.display = "none";
    }
}

let cancelSubtask = document.getElementById("cancel-subtask")
cancelSubtask.addEventListener("click", () => {
    taskCreation.style.display = "none";
    inputButtons.style.display = "none";
    document.getElementById("priority").value = "";
    document.getElementById('task-input').value = "";
    document.getElementById('my-input').value = "";

})

function renderSubTasks() {
    let ul = document.querySelector('.lists');
    ul.innerHTML = "";

    let subTasklist = taskSets[setIndex].subTasks;
        for (var i= 0; i < subTasklist.length; i++) {
            if (subTasklist[i].done) {
            ul.innerHTML += `<li>
            <i class="fa fa-check-square-o" data-index="${i}" onclick="toggleDone(event)"></i>
            <span>${subTasklist[i].priority}</span>
            <span>${subTasklist[i].title}</span>
            <i class="fa fa-trash-o" data-index="${i}" onclick="deleteSubTask(event)"></i>
            <div class="due">
            ${subTasklist[i].duedate}
            </div>
            </li>`
            } else {
            ul.innerHTML += `<li>
            <i class="fa fa-square-o" data-index="${i}" onclick="toggleDone(event)"></i>
            <span>${subTasklist[i].priority}</span>
            <span>${subTasklist[i].title}</span>
            <i class="fa fa-trash-o" data-index="${i}" onclick="deleteSubTask(event)"></i>
            <div class="due">
            ${subTasklist[i].duedate}
            </div>
            </li>`
            }

        }
        
    }

window.toggleDone = function(e) {
    let taskIndex= e.target.dataset.index;
    let test = taskSets[setIndex].subTasks[taskIndex]
    test.done = !test.done
    // taskSets[setIndex].subTasks[taskIndex].done= !taskSets[setIndex].subTasks[taskIndex].done
    renderSubTasks();
}

window.deleteSubTask = function(e) {
    let deleteTaskIndex= e.target.dataset.index;
    taskSets[setIndex].subTasks.splice( deleteTaskIndex , 1);
    renderSubTasks();
}


