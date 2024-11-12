import "./styles.css";

let myTasks = [];
let tasksComplete = [];

const taskInput = document.getElementById("task-inpt");
const addBtn = document.getElementById("add-btn");
const task = document.getElementById("tasks");
const h3 = document.getElementById("tsks");
const ch3 = document.getElementById("ctsks");
var txt = document.createTextNode("\u2713");

addBtn.addEventListener("click", () => {
    addTask(taskInput.value);
    updateH3();
});

task.addEventListener("click", (e) => {
    for (const child of task.children) {
            let target = e.target;
            if (target.id === "rmv-btn") {
                myTasks.splice(target.parentElement.id, 1);
                target.parentElement.remove();
                if (tasksComplete.includes(child)) {
                    tasksComplete.splice(tasksComplete.indexOf(child), 1);
                }
            } else if (target.id === "taskbtn-div" && JSON.stringify(target.parentElement) === JSON.stringify(child)) {
                if (!tasksComplete.includes(child)) {
                    tasksComplete.push(child);
                    target.style.backgroundColor = "#ddd";
                    target.firstChild.appendChild(txt);
                    target.lastChild.style.textDecoration = "line-through";
                    console.log("Already exists");
                } else {
                    target.style.backgroundColor = "#fffdfd";
                    target.firstChild.innerHTML = "";
                    target.lastChild.style.textDecoration = "none";
                    tasksComplete.splice(tasksComplete.indexOf(child), 1);
                    console.log("Added");
                }
            }
    }
    console.log(myTasks);
    console.log(tasksComplete);
    updateH3();
    updateCH3()
});


function addTask(tsk) {
    if (tsk.trim().length !== 0) {
        myTasks.push(createTask(tsk)); 
    } else {
        alert("Enter a valid task.")
    }
    taskInput.value = "";
}

function createTask(tsk) {
    const tskDiv = document.createElement("div");
    tskDiv.classList.add("task-div");
    tskDiv.id = myTasks.length;
    task.appendChild(tskDiv);
    const taskBtnDiv = document.createElement("div");
    taskBtnDiv.id = "taskbtn-div";
    tskDiv.appendChild(taskBtnDiv);
    const spn = document.createElement("span");
    spn.innerHTML = " ";
    spn.id = "done-spn";
    const h2 = document.createElement("h2");
    h2.textContent = tsk;
    taskBtnDiv.append(spn, h2);
    const btn = document.createElement("button");
    btn.id = "rmv-btn";
    btn.textContent = "x";
    tskDiv.appendChild(btn);
    return tskDiv;
}

function updateH3() {
    h3.textContent = `Tasks: ${myTasks.length}`;
}

function updateCH3() {
    ch3.textContent = `Completed Tasks: ${tasksComplete.length}`;
}