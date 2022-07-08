// all docs needed
const input = document.getElementById('input');
const addBtn = document.querySelector('#add');
const todoList = document.querySelector('.todo-list-ul');


const initialLoad = ()=>{
    let todos = JSON.parse(localStorage.getItem('todos'));
    if(todos){
        todos.forEach(todo=>{
            createElement(todo);
        })
        return;
    }
    todos = [];
    localStorage.setItem('todos',JSON.stringify(todos));
   
}




const createElement = (text)=>{
    const li = document.createElement('li');
    li.classList.add('todo-list-li')
    const checkBox = document.createElement('input');
    checkBox.type="checkbox";
    const label = document.createElement('label');
    label.innerText = text;
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText ="Delete"

    // appending elements
    li.appendChild(checkBox);
    li.appendChild(label);
    li.appendChild(deleteBtn);

    todoList.appendChild(li);

    // adding event listener
    checkBox.addEventListener('click',checkHandler);
    deleteBtn.addEventListener('click',deleteHandler);
    label.addEventListener('dblclick',editTask);
}

const editEnterHandler = (e,text)=>{
    const input = e.target;
    if(e.keyCode === 13){
        const label = document.createElement('label');
        label.innerText = input.value;
        input.parentElement.replaceChild(label,input);
        const todos = JSON.parse(localStorage.getItem('todos'));
        todos.splice(todos.indexOf(text),1,input.value);
        localStorage.setItem('todos',JSON.stringify(todos));
        label.addEventListener('dblclick',editTask);
    } 
}
const editTask = (e)=>{
    const label = e.target;
    const input = document.createElement('input');
    input.type = "text";
    input.value = label.innerText;
    label.parentElement.replaceChild(input,label);
    input.addEventListener('keypress',(e)=>editEnterHandler(e,label.innerText));
}
const deleteHandler = (e)=>{
    const li = e.target.parentElement;
    const label = li.querySelector("label");
    const text = label.innerText;
    const todos = JSON.parse(localStorage.getItem('todos'));
    todos.splice(todos.indexOf(text),1);
    localStorage.setItem('todos',JSON.stringify(todos));
    todoList.removeChild(li);
}

const  checkHandler = (e)=>{
    const checkBox = e.target;
    const label = checkBox.nextElementSibling;
    label.classList.toggle('checked');
}

const addTodo = ()=>{
    const text = input.value;
    if (text === '') {
        alert('Please enter a todo');
        return;
    }
    // createing elemments
    createElement(text);
    // adding to local storage
    let todos = JSON.parse(localStorage.getItem('todos'));
    if(todos){
        todos.push(text);
    }else{
        todos = [text];
    }
    localStorage.setItem('todos',JSON.stringify(todos));
     // clearing input
     input.value = '';
    
}

const inputEnterHandler = (e)=>{
    if(e.keyCode === 13){
        addTodo();
    }
}





// add event listeners to buttons
addBtn.addEventListener('click', addTodo);
input.addEventListener('keydown',inputEnterHandler);
initialLoad();