import { setIndex } from 'src/dom.js'
import { taskSets } from 'src/index.js'

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

export { renderSubTasks, renderTaskSets }; 