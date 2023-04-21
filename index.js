const listItems = document.querySelector(".todo-items");
const form = document.querySelector("form");

let todoItemsArray = [];

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let value = this[0].value;
  todoItemsArray.push({
    value,
    id: Math.random().toString(36).slice(2),
    isComplete: false,
  });
  localStorage.setItem("todos", JSON.stringify(todoItemsArray));
  appendTodo();
});

const createElements = (item) => {
  const checkbox = document.createElement("input");
  const todoText = document.createElement("span");
  const textContainer = document.createElement("p");
  const button = document.createElement("button");
  const listItem = document.createElement("li");

  button.setAttribute("type", "button");

  console.dir(checkbox);
  todoText.innerHTML = item.value;
  button.innerHTML = "Delete";
  checkbox.setAttribute("type", "checkbox");
  textContainer.append(checkbox, todoText);

  listItem.setAttribute("class", "todo-item");
  listItem.setAttribute("id", item.id);
  listItem.append(textContainer, button);
  listItems.prepend(listItem);
};

const appendTodo = () => {
  if (listItems.childElementCount > 0) {
    listItems?.removeChild(listItems.querySelector(".todo-item"));
  }
  let parsedJson = JSON.parse(localStorage.getItem("todos"));
  parsedJson.forEach((item) => {
    const createdelement = createElements(item);
  });

  // hookup checkbox strike through functionality
  listItems.querySelectorAll("input[type='checkbox']").forEach((item) => {
    item.addEventListener("click", function () {
      console.dir(this.nextElementSibling);
      if (!this.nextElementSibling.className.includes("checked")) {
        this.nextElementSibling.classList.add("checked");
      } else {
        this.nextElementSibling.classList.remove("checked");
      }
      // console.dir(this.nextElementSibling.classList.add('checked'));
    });
  });


  // hook up delete functionality
  listItems.querySelectorAll("button").forEach((item) => {
    item.addEventListener("click", function () {
      const elementId = this.parentElement.id;
      const filteredArray = parsedJson.filter(
        (parsed) => parsed.id !== elementId
      );
      localStorage.setItem("todos", JSON.stringify(filteredArray));
      window.location.reload();
    });
  });
};

window.addEventListener("load", appendTodo());
