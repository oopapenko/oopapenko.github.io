const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

let todos = [];
let id = 0;

//<li>
//  <input type="checkbox">
//  <button>deleta</button>
//  <span>text</span>
//</li>

class Todo{
  constructor(){
    this.id=++id;
    this.check = false;
    this.text = this.getText();
  }
  getText(){
    return prompt('Enter a todo task:')
  }
}

function newTodo() {  
  const todo = new Todo();
  todos.push(todo);
  render();
}

function render(){
  list.innerHTML=``;
  todos.map(createTodo).forEach(todo => list.appendChild(todo));
  itemCountSpan.textContent=todos.length;
}

function createTodo(todo){
  //create li
  const li = document.createElement("li");

  //create input checkbox
  //create button
  //create span

  li.innerHTML = `
  <input type="checkbox">
  <button onclick="deleteTodo(${todo.id})">delete</button>
  <span>${todo.text}</span>
  `;
  return li;
}

function deleteTodo(id){
  todos = todos.filter(todo => todo.id !== id)
  render();  
}