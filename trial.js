

//Q5
const addBtn = document.getElementById("add-task");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

function taskAdded()
{
  const taskText = taskInput.value;
  if(taskText===""){return;}

  const taskAdded = document.createElement("li");
  const deleteButton = document.createElement("button");
  taskAdded.textContent = taskText;
  deleteButton.textContent ="X";
  deleteButton.classList.add("delete-btn");

  taskAdded.appendChild(deleteButton);
  taskList.appendChild(taskAdded);

  taskAdded.addEventListener('click',() =>{
    taskAdded.classList.toggle("completed");
  });

  deleteButton.addEventListener('click',()=>{
    
    taskList.removeChild(taskAdded);
  });
}

addBtn.addEventListener('click', taskAdded);
taskInput.addEventListener('keydown',e => {
  if (e.key === "Enter"){
    taskAdded();
  }
});

const noteInput = document.getElementById("note-input");
const addNote = document.getElementById("add-note");
const notesList = document.getElementById("notes-list");

const savedNotes = JSON.parse(localStorage.getItem("notesArray")) || [];
savedNotes.forEach(note =>{
  createNote(note);
});

const notesArray = [...savedNotes];

function createNote(note){
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  li.textContent = note;
  delBtn.textContent = "X";

  li.appendChild(delBtn);
  notesList.appendChild(li);

  delBtn.addEventListener('click',()=>{
    notesList.removeChild(li);

    const index = notesArray.indexOf(note);
    notesArray.splice(index,1);
    localStorage.setItem("notesArray",JSON.stringify(notesArray));
  });
}

addNote.addEventListener('click',() =>{
  const noteText = noteInput.value;
  if(noteText===""){return;}

  createNote(noteText);

  notesArray.push(noteText);
  localStorage.setItem("notesArray",JSON.stringify(notesArray));
  noteInput.value="";
});

noteInput.addEventListener('keydown',e =>{
  if(e.key==="Enter"){
    addNote.click();
  }
});