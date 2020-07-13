import 'babel-polyfill';

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



export { taskSets, taskSet, subTask }


////////////////////////////////////

