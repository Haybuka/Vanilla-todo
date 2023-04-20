const listItems = document.querySelector(".todo-items");
const form = document.querySelector("form");

let todoItemsArray = [];
localStorage.setItem("todos", JSON.stringify(todoItemsArray));
form.addEventListener("submit", function (event) {
  event.preventDefault();
  let value = this[0].value;
  todoItemsArray.push({
    value,
    id: Math.random().toString(36).slice(2),
    isComplete: false,
  });
  localStorage.setItem("todos", JSON.stringify(todoItemsArray));
appendTodo()
});

const createElements = (item) => {
  const checkbox = document.createElement("input");
  const todoText = document.createElement("span");
  const textContainer = document.createElement("p");
  const button = document.createElement("button");
  const listItem = document.createElement("li");

  todoText.innerHTML = item.value;
  button.innerHTML = "Delete";
  checkbox.setAttribute("type", "checkbox");
  textContainer.append(checkbox, todoText);
  //   console.log(textContainer);

  listItem.setAttribute("class", "todo-item");
  listItem.append(textContainer, button);
  listItems.append(listItem);
};

const appendTodo = () => {
    listItems.removeChild(listItems.querySelector(".todo-item"))
  JSON.parse(localStorage.getItem("todos"))?.forEach((item) => {
    console.log("item called");
    const createdelement = createElements(item);
  });
};

// console.log(todoItemsArray);
