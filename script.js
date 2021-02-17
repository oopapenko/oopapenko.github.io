const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

var todos = [];
try {
  var len = localStorage.getItem('length');
  console.log("len="+len)
  let todo=[];
  if(len>0){
    for(let i = 0; i<len;i++){
      if(localStorage.getItem(`todo.id${i}`)===undefined){
        break;
      }      
      todo = {id: Number(localStorage.getItem(`todo.id${i}`)), check: Boolean(localStorage.getItem(`todo.check${i}`)),text: localStorage.getItem(`todo.text${i}`)};      
      todos.push(todo);         
    }
  }
  var id=todos[len-1].id;
  console.log('id='+id)
}
catch (e) {
  var id = 0;
}
if (todos.length != 0) {
  render();
}


//<li>
//  <input type="checkbox">
//  <button>deleta</button>
//  <span>text</span>
//</li>

class Todo {
  constructor() {
    this.id = ++id;
    this.check = false;
    this.text = this.getText();
  }
  getText() {
    return prompt('Enter a todo task:')
  }
}

function newTodo() {
  const todo = new Todo();
  todos.push(todo);
  render();
}

function render() {
  list.innerHTML = ``;
  todos.map(createTodo).forEach(todo => list.appendChild(todo));
  localStorage.setItem('length', todos.length)
  for(let i = 0; i<todos.length;i++){  
    localStorage.setItem(`todo.id${i}`,todos[i].id);    
    localStorage.setItem(`todo.check${i}`,todos[i].check?1:"");    
    localStorage.setItem(`todo.text${i}`,todos[i].text);    
  }
  
  itemCountSpan.textContent = todos.length;
  uncheckedCountSpan.textContent = todos.filter(todo => !todo.check).length;
}

function createTodo(todo) {
  const li = document.createElement("li");
  li.className = 'todo-container'
  li.innerHTML = `
  <input class = 'todo-checkbox' type="checkbox" onchange="changeTodo(${todo.id})" ${todo.check ? "checked" : ""}>
  <button class = 'todo-delete' onclick="deleteTodo(${todo.id})">delete</button>
  <span>${todo.text}</span>
  `;
  return li;
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id)
  render();
}

function changeTodo(id) {
  //  for (let i = 0; i < todos.length; i++) {
  //    if (todos[i].id === id) {
  //      todos[i].check = !todos[i].check;
  //      break;
  //    }
  //  }


  //todos = todos.map(todo => todo.id === id ? { id: todo.id, text: todo.text, check: !todo.check } : todo)

  todos = todos.map(todo => todo.id === id ? { ...todo, check: !todo.check } : todo)

  uncheckedCountSpan.textContent = todos.filter(todo => !todo.check).length;
  render()
}