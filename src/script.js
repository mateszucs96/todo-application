'use strict';


const body = document.querySelector('body');
const switchDarkMode = document.querySelector('.switch-dark-mode');
const addInput = document.querySelector('.input-container .check-circle');
const input = document.querySelector('.input-container input');
const form = document.querySelector('.form-container');
const todoContainer = document.querySelector('.items-container');
const itemCounter = document.querySelector('.item-counter');
const headerContainer = document.querySelector('.header-container');
const selectorContainer = document.querySelector('.selector-container');

const todos = [];
let todosCopy = [];
let completedArr = [];



function handleSwitchMode(e) {
    if (e.target.attributes.src.value === './images/icon-sun.svg') {
        e.target.src = './images/icon-moon.svg';
        body.classList.add('light-mode');
        headerContainer.style.backgroundImage = 'url("./images/bg-mobile-light.jpg")';
    } else {
        e.target.src = './images/icon-sun.svg';
        body.classList.remove('light-mode');
        headerContainer.style.backgroundImage = 'url("./images/bg-mobile-dark.jpg")';
    }
}

const updateToDoCounter = (arr) => itemCounter.textContent = `${arr.length} items left`;

const addNewToDo = (e) => {
    //prevent to reload
    e.preventDefault();
    // push the input value to the "todos" array
    todos.push(input.value);
    displayToDo(todos);

    //set the input field empty
    input.value = '';


}

const displayToDo = (arr) => {
    todoContainer.textContent = '';

    arr.forEach((el) => {
        const type = arr === completedArr ? 'completed' : '';
        const html = `
            <div class="items-container__item-container list-style">
                <div class="check-circle ${type}"></div>
                <h4>
                    ${el}
                </h4>
                <img class="cross-icon" src="./images/icon-cross.svg" />
            </div>
            `
        todoContainer.insertAdjacentHTML('afterbegin', html);
        console.log()
    });


    updateToDoCounter(arr);
};


const reRenderToDo = (e) => {
    todoContainer.textContent = '';
    console.log(completedArr)
    displayToDo(completedArr)
}

const deleteToDo = (e) => {
    console.log(e)

    if (e.target.classList.contains('cross-icon')) {

        //remove the element from the todos array
        const index = todos.indexOf(e.target.parentNode.children[1].textContent.trim());
        todos.splice(index, 1);
        //remove the element from the todos list
        e.target.parentNode.remove();
        updateToDoCounter(todos);

    }
};


const markItems = (e) => {
    todosCopy = [...todos];
    if (e.target.parentNode.children[0].classList.contains('completed')) {
        //remove the check mark
        e.target.parentNode.children[0].classList.remove('completed');
        //remove the line-through 
        e.target.parentNode.children[1].style.textDecoration = 'none';
        // remove the element on the todos array
        const index = todosCopy.indexOf(e.target.parentNode.children[1].textContent.trim());
        completedArr.splice(index, 1);
        updateToDoCounter(completedArr);

        console.log(todos)
        return;
    }

    if (e.target.parentNode.children[0].classList.contains('check-circle')) {
        //add the check mark
        e.target.parentNode.children[0].classList.add('completed')
        // add the line-through
        e.target.parentNode.children[1].style.textDecoration = 'line-through';
        //push back the element to the todos array
        const index = todosCopy.indexOf(e.target.parentNode.children[1].textContent.trim());
        completedArr.push(...todosCopy.splice(index, 1));
        updateToDoCounter(todos);

        console.log(todos)
        return;
    }


}

// handle the markItems and deleteToDo on the same container
const eventHandler = (e) => {
    if (e.target.classList.contains('check-circle')) {
        markItems(e);
    }
    if (e.target.classList.contains('cross-icon')) {
        deleteToDo(e);
    }
}

const setActiveSelector = (e) => {
    console.log(e.target.textContent)
    if (e.target.classList.contains('selector-completed')) {
        Array.from(e.target.parentNode.children).forEach(el => el.classList.remove('active'));
        e.target.classList.add('active');
        todoContainer.textContent = '';
        displayToDo(completedArr.reverse());
    }
    if (e.target.classList.contains('selector-all')) {
        Array.from(e.target.parentNode.children).forEach(el => el.classList.remove('active'));
        e.target.classList.add('active');
        todoContainer.textContent = '';
        displayToDo(todos);
    }
    if (e.target.classList.contains('selector-active')) {
        Array.from(e.target.parentNode.children).forEach(el => el.classList.remove('active'));
        e.target.classList.add('active');
        todoContainer.textContent = '';
        displayToDo(todosCopy);
    }
};


//Dark and Light mode toggle
switchDarkMode.addEventListener('click', handleSwitchMode);

//Add new ToDo
form.addEventListener('submit', addNewToDo);

//Delete ToDo and Mark items handler
todoContainer.addEventListener('click', eventHandler);

//Selector container active state {
selectorContainer.addEventListener('click', setActiveSelector);
