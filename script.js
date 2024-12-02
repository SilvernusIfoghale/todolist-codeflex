const inputText = document.querySelector(".input-El");
const addButton = document.querySelector(".btn-add");
const todoEl = document.querySelector(".todo-list");

let todoList = getTodo();
updateTodoList();

//Add button
addButton.addEventListener("click", () => {
  addTodo();
});

//Add function
const addTodo = () => {
  let input = inputText.value.trim();
  if (input === "") {
    alert("Enter a Task!");
  } else {
    const todoObject = {
      text: input,
      completed: false,
    };
    todoList.push(todoObject);
    updateTodoList();
    saveTodo();
    inputText.value = "";
  }
};

//update function
function updateTodoList() {
  todoEl.innerHTML = "";
  todoList.map((input, inputIndex) => {
    todoItem = createTodoItem(input, inputIndex);
    todoEl.append(todoItem);
  });
}

//create function
function createTodoItem(input, inputIndex) {
  const list = document.createElement("div");
  const todoText = input.text;
  list.classList = "output";
  list.innerHTML = `
         <div class="left">
           <input type="checkbox" name="check" id=${inputIndex}  />
           <p class="output-text">${todoText}</p>
         </div>
         <button class="btn-delete" id=${inputIndex}>Delete</button>
       `;
  //delete button
  const deleteButton = list.querySelector(".btn-delete");
  deleteButton.addEventListener("click", () => {
    deleteTodo(inputIndex);
  });
  //check button
  const checkbox = list.querySelector("input");
  checkbox.addEventListener("change", () => {
    todoList[inputIndex].completed = checkbox.checked;
    saveTodo();
  });
  checkbox.checked = input.completed;
  return list;
}

//delete todo function
function deleteTodo(inputIndex) {
  todoList = todoList.filter((todo, todoIndex) => todoIndex !== inputIndex);
  saveTodo();
  updateTodoList();
  //   console.log("here");
}

//save to local storage
function saveTodo() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

//get data from local storage
function getTodo() {
  const myTodo = localStorage.getItem("todoList") || "[]";
  return JSON.parse(myTodo);
}
