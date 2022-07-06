// all docs needed
const input = document.getElementById('input');
const addBtn = document.querySelector('#add');
const todoList = document.querySelector('.todo-list-ul');




const deleteHandler = (e)=>{
    const li = e.target.parentElement;
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
    const li = document.createElement('li');
    li.classList.add('todo-list-li')
    const checkBox = document.createElement('input');
    checkBox.setAttribute('id',text);
    checkBox.type="checkbox";
    const label = document.createElement('label');
    label.innerText = text;
    label.setAttribute('for',text);
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText ="Delete"

    // appending elements
    li.appendChild(checkBox);
    li.appendChild(label);
    li.appendChild(deleteBtn);

    todoList.appendChild(li);

    // clearing input
    input.value = '';

    // adding event listener
    checkBox.addEventListener('click',checkHandler);
    deleteBtn.addEventListener('click',deleteHandler);
}

const inputEnterHandler = (e)=>{
    if(e.keyCode === 13){
        addTodo();
    }
}





// add event listeners to buttons
addBtn.addEventListener('click', addTodo);
input.addEventListener('keydown',inputEnterHandler)