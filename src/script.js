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



const addNewToDo = (e) => {
    //prevent to reload
    e.preventDefault();
    // push the input value and the "state" to the "todos" array
    todos.push({ text: `${input.value}`, isCompleted: false })
    // update the screen
    updateUI(todos)
    //set the input field empty 
    input.value = '';
}

// display the item counter
const displayCounter = (arr) => itemCounter.textContent = `${arr.length} items left`;

// display the list
const displayToDo = (arr) => {
    todoContainer.textContent = '';

    arr.forEach((el) => {
        const type = el.isCompleted === true ? 'completed' : '';
        const style = el.isCompleted ? 'line' : '';
        const html = `
            <div class="items-container__item-container list-style">
                <div class="check-circle ${type}"></div>
                <h4 class="${style}">
                    ${el.text}
                </h4>
                <img class="cross-icon" src="./images/icon-cross.svg" />
            </div>
            `
        todoContainer.insertAdjacentHTML('afterbegin', html);

    });

};

// wrapper function to display
const updateUI = arr => {
    displayCounter(arr);
    displayToDo(arr);
}

const deleteToDo = (e) => {
    if (e.target.classList.contains('cross-icon')) {
        //remove the element from the todos array
        todos.forEach((el, i) => {
            el.text === e.target.parentNode.children[1].textContent.trim() && todos.splice(i, 1)
        })


        //remove the element from the todos list
        e.target.parentNode.remove();
        displayCounter(todos);
        console.log(todos)
    }
};


const markItems = (e) => {
    const selectedTodo = e.target.parentNode.children[1].textContent.trim();
    if (!e.target.parentNode.children[0].classList.contains('completed')) {
        //add the check mark
        e.target.parentNode.children[0].classList.add('completed')
        // add the line-through
        e.target.parentNode.children[1].style.textDecoration = 'line-through';
        // change the state to completed
        todos.forEach((el, i) => {
            if (el.text === selectedTodo) el.isCompleted = true;
        })
        displayCounter(todos.filter(el => el.isCompleted === false));

    } else {
        //add the check mark
        e.target.parentNode.children[0].classList.remove('completed')
        // add the line-through
        e.target.parentNode.children[1].style.textDecoration = 'none';

        // change the state to not completed
        todos.forEach((el, i) => {
            if (el.text === selectedTodo) el.isCompleted = false;
        });
        displayCounter(todos.filter(el => el.isCompleted === false));
    };
};

// handle the markItems and deleteToDo on the same container
const eventHandler = (e) => {
    if (e.target.classList.contains('check-circle')) {
        markItems(e);
    };
    if (e.target.classList.contains('cross-icon')) {
        deleteToDo(e);

    };
};

const setActiveSelector = (e) => {
    console.log(e.target.textContent)
    if (e.target.classList.contains('selector-completed')) {
        Array.from(e.target.parentNode.children).forEach(el => el.classList.remove('active'));
        e.target.classList.add('active');
        todoContainer.textContent = '';
        updateUI(todos.filter(el => el.isCompleted === true))
    }
    if (e.target.classList.contains('selector-all')) {
        Array.from(e.target.parentNode.children).forEach(el => el.classList.remove('active'));
        e.target.classList.add('active');
        todoContainer.textContent = '';
        updateUI(todos);
    }
    if (e.target.classList.contains('selector-active')) {
        Array.from(e.target.parentNode.children).forEach(el => el.classList.remove('active'));
        e.target.classList.add('active');
        todoContainer.textContent = '';
        console.log(todos)
        updateUI(todos.filter(el => el.isCompleted === false));

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
