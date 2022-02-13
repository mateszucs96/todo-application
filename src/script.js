'use strict';



const switchDarkMode = document.querySelector('.switch-dark-mode');
const addInput = document.querySelector('.input-container .check-circle');
const input = document.querySelector('.input-container input');
const form = document.querySelector('.form-container');
const todoContainer = document.querySelector('.items-container');
const itemCounter = document.querySelector('.item-counter');

const todos = [];

const handleSwitchMode = (e) => {
    if (e.target.attributes.src.value === './images/icon-sun.svg') {
        e.target.src = './images/icon-moon.svg'
    } else {
        e.target.src = './images/icon-sun.svg'
    }
}

const updateToDoCounter = () => itemCounter.textContent = `${todos.length} items left`;

const addNewToDo = (e) => {
    //prevent to reload
    e.preventDefault();
    // push the input value to the "todos" array
    todos.push(input.value);
    displayToDo();

    //set the input field empty
    input.value = '';


}

const displayToDo = () => {
    const html = `
    <div class="items-container__item-container list-style">
        <div class="check-circle"></div>
        <h4>
            ${input.value}
        </h4>
        <img class="cross-icon" data-number="${todos.length - 1}" src="./images/icon-cross.svg" />
    </div>
    `

    todoContainer.insertAdjacentHTML('afterbegin', html);

    updateToDoCounter();
}

const deleteToDo = (e) => {
    console.log(e)

    if (e.target.classList.contains('cross-icon')) {

        //remove the element from the todos array
        const index = todos.indexOf(e.target.parentNode.children[1].textContent.trim());
        todos.splice(index, 1);
        //remove the element from the todos list
        e.target.parentNode.remove();
        updateToDoCounter();
        console.log(todos)
    }
};


const markItems = (e) => {
    console.log(e)
    if (e.target.parentNode.children[0].classList.contains('completed')) {
        //remove the check mark
        e.target.parentNode.children[0].classList.remove('completed');
        //remove the line-through 
        e.target.parentNode.children[1].style.textDecoration = 'none';
        // remove the element on the todos array
        const index = todos.indexOf(e.target.parentNode.children[1].textContent.trim());
        todos.splice(index, 0, e.target.parentNode.children[1].textContent.trim());
        updateToDoCounter();
        return;
    }

    if (e.target.parentNode.children[0].classList.contains('check-circle')) {
        //add the check mark
        e.target.parentNode.children[0].classList.add('completed')
        // add the line-through
        e.target.parentNode.children[1].style.textDecoration = 'line-through';
        //push back the element to the todos array
        const index = todos.indexOf(e.target.parentNode.children[1].textContent.trim());
        todos.splice(index, 1);

        updateToDoCounter();
        return;
    }


}

// handle the markItems and deleteToDo on the same container
function eventHandler(e) {
    if (e.target.classList.contains('check-circle')) {
        markItems(e);
    }
    if (e.target.classList.contains('cross-icon')) {
        deleteToDo(e);
    }
}

//Dark and Light mode toggle
switchDarkMode.addEventListener('click', handleSwitchMode);

//Add new ToDo
form.addEventListener('submit', addNewToDo);

//Delete ToDo and Mark items handler
todoContainer.addEventListener('click', eventHandler);





