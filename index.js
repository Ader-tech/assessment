let taskCount = 0;
let doneCount = 0;
let taskHeadingVisible = false;
let doneHeadingVisible = false;

document.getElementById("addTaskBtn").addEventListener("click", addTask);

function addTask() {
    const input = document.getElementById("taskInput").value.trim();
    if (input === "") {
        alert("Please enter a task!");
        return;
    }
    const ul = document.getElementById("taskList");
    const li = document.createElement("li");
    const taskText = document.createTextNode(input); 
    li.appendChild(taskText);

    const markDoneBtn = document.createElement("button");
    markDoneBtn.innerHTML = "<i class='fas fa-check'></i>";
    markDoneBtn.addEventListener("click", function() {
        markDone(li);
    });

    const editBtn = document.createElement("button");
    editBtn.innerHTML = "<i class='fas fa-edit'></i>";
    editBtn.addEventListener("click", function() {
        editTask(li);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "<i class='fas fa-trash-alt'></>";
    deleteBtn.addEventListener("click", function() {
        deleteTask(li);
    });

    li.appendChild(markDoneBtn);
    li.appendChild(deleteBtn);
    li.appendChild (editBtn);
    ul.appendChild(li);
    updateTaskHeading(++taskCount);
    document.getElementById("taskInput").value = "";

    if (!taskHeadingVisible) {
        const taskHeading = document.getElementById("taskHeading");
        taskHeading.style.display = "block";
        taskHeadingVisible = true;
    }
}

function editTask(task) {
    const taskText = task.firstChild.textContent;
    const originalTaskText = taskText.trim();
    const newTaskText = prompt("Edit task:", originalTaskText);
    if (newTaskText === null || newTaskText === "") {
        return;
    }
    task.firstChild.textContent = newTaskText;
}

function markDone(task) {
    const doneList = document.getElementById("doneList");
    const doneTitle = document.getElementById("doneTitle");
    const taskText = task.firstChild.textContent;
    const originalTaskText = taskText.trim(); 
    const doneText = document.createTextNode(originalTaskText);
    const doneLi = document.createElement("li");
    doneLi.appendChild(doneText);
    doneLi.classList.add("done");
    const undoBtn = document.createElement("button");
    undoBtn.innerHTML = "<i class='fas fa-undo'></i>";
    undoBtn.addEventListener("click", function() {
        undoTask(doneLi, originalTaskText); 
    });
    doneLi.appendChild(undoBtn);
    doneList.appendChild(doneLi);
    task.style.display = "none";
    if (!doneTitle.style.display) {
        doneTitle.style.display = "block"; 
    }
    updateDoneHeading(++doneCount); 
    updateTaskHeading(--taskCount); 
}

function deleteTask(task) {
    task.remove();
    updateTaskHeading(--taskCount); 
    if (taskCount === 0) {
        const taskHeading = document.getElementById("taskHeading");
        taskHeading.style.display = "none";
        taskHeadingVisible = false;
    }
}

function undoTask(task, originalText) {
    const ul = document.getElementById("taskList");
    const li = document.createElement("li");
    const taskTextEl = document.createTextNode(originalText);
    li.appendChild(taskTextEl);

    const markDoneBtn = document.createElement("button");
    markDoneBtn.innerHTML = "<i class='fas fa-check'></i>";
    markDoneBtn.addEventListener("click", function() {
        markDone(li);
    });

    const editBtn = document.createElement("button");
    editBtn.innerHTML = "<i class='fas fa-edit'></i>";
    editBtn.addEventListener("click", function() {
        editTask(li);
    });
    
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "<i class='fas fa-trash-alt'></i>";
    deleteBtn.addEventListener("click", function() {
        deleteTask(li);
    });

    li.appendChild(markDoneBtn);
    li.appendChild(deleteBtn);
    li.appendChild(editBtn);
    ul.appendChild(li);
    task.remove();
    updateTaskHeading(++taskCount); 
    updateDoneHeading(--doneCount); 
}

function updateDoneHeading(count) {
    const doneTitle = document.getElementById("doneTitle");
    doneTitle.textContent = `Done - ${count}`;
    doneTitle.style.display = count > 0 ? "block" : "none"; 
}
const taskList = document.querySelectorAll(".taskList")
const addTaskBtn = document.querySelectorAll(".addTaskBtn")

addTaskBtn.addEventListener("click", () => {
   const text =document.querySelectorAll("taskInput").value
   taskList.textContent = text
   localStorage.setItem("task", text)
  })
