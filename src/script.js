'use strict';



const switchDarkMode = document.querySelector('.switch-dark-mode');
const addInput = document.querySelector('.input-container .check-circle');
const input = document.querySelector('.input-container input');
const form = document.querySelector('.form-container');
const todoContainer = document.querySelector('.items-container');

const todos = [];


// const html = `
// <div class="calories">
//   <h4 class="calories__name">${foods[selected].name}</h4>

//   <h4 class="calories__value">${kalories} kcal</h4>
// </div>
// `;

// caloriesContainter.insertAdjacentHTML('afterbegin', html);

console.log(switchDarkMode.src)
const handleSwitchMode = (e) => {
    e.target.src = './images/icon-moon.svg';
}

const addNewToDo = (e) => {
    //prevent to reload
    e.preventDefault();
    // push the input value to the "todos" array
    todos.push(input.value);
    const html = `
        <div class="items-container__item-container list-style">
            <div class="check-circle"></div>
            <h4>
                ${input.value}
            </h4>
            <img src="./images/icon-cross.svg" />
        </div>
    `
    todoContainer.insertAdjacentHTML('afterbegin', html);

    //set the input field empty
    input.value = '';


    console.log(todos)
}

switchDarkMode.addEventListener('click', handleSwitchMode);

form.addEventListener('submit', addNewToDo);