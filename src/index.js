import "./styles.css";

let myTasks = [];
let tasksComplete = [];

const taskInput = document.getElementById("task-inpt");
const addBtn = document.getElementById("add-btn");
const task = document.getElementById("tasks");
const taskDiv = document.querySelectorAll(".task-div")
const rmvBtn = document.querySelectorAll("#rmv-btn");
const h3 = document.querySelector("h3");

addBtn.addEventListener("click", () => {
    addTask(taskInput.value);
    updateH3();
});

task.addEventListener("click", () => {
    for (const child of task.children) {
        child.addEventListener("click", (e) => {
            let target = e.target;
            if (target.id === "rmv-btn") {
                myTasks.splice(target.parentElement.id, 1);
                target.parentElement.remove();
            } else if (target.id === "taskbtn-div") {
                if (!tasksComplete.includes(child)) {
                    target.style.backgroundColor = "#ddd";
                    target.firstChild.textContent = "v";
                    tasksComplete.push(child);
                } else {
                    target.style.backgroundColor = "#fffdfd";
                    target.firstChild.textContent = "";
                    tasksComplete.splice(tasksComplete.indexOf(child), 1);
                }
            }
        });
    }
    console.log(myTasks);
    updateH3();
});

for (let i = 0; i < task.length; i++) {
    task[i].addEventListener("click", (e) => {
        const target = e.target;
        if (target.id == "rmv-btn") {
            myTasks.splice(target.parentElement.id, 1);
            target.parentElement.remove();
        }
    });
}


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