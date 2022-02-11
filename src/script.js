'use strict';



const switchDarkMode = document.querySelector('.switch-dark-mode');
const addInput = document.querySelector('.input-container .check-circle');
const input = document.querySelector('.input-container input');
const form = document.querySelector('.form-container');
const todoContainer = document.querySelector('.items-container');
const itemCounter = document.querySelector('.item-counter');

const todos = [];
let crossIcon = [];


console.log(switchDarkMode.src)
const handleSwitchMode = (e) => {
    if (e.target.attributes.src.value === './images/icon-sun.svg') {
        e.target.src = './images/icon-moon.svg'
    } else {
        e.target.src = './images/icon-sun.svg'
    }
}

const addNewToDo = (e) => {
    //prevent to reload
    e.preventDefault();
    // push the input value to the "todos" array
    todos.push(input.value);
    displayToDo();

    crossIcon = document.querySelectorAll('.cross-icon');

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

    // const crossIcon = document.querySelectorAll('.cross-icon');
    // crossIcon.forEach((el, i) => el.addEventListener('click', () => console.log('clicked')));
    // console.log(crossIcon);
}

const deleteToDo = (e) => {
    if (e.target.classList.contains('cross-icon')) {
        //remove the element from the todos array
        const index = todos.indexOf(e.target.parentNode.children[1].textContent.trim());
        todos.splice(index, 1);
        //remove the element from the todos list
        e.target.parentNode.remove();
    }
};

todoContainer.addEventListener('click', deleteToDo);



console.log(crossIcon)
switchDarkMode.addEventListener('click', handleSwitchMode);

form.addEventListener('submit', addNewToDo);