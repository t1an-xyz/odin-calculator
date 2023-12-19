const display = document.getElementById('display');
let left = null;
let op = '';
let right = null;
let errorState = false;
let ans = null;

let reset = function() {
    display.innerText = '0';
    left = null;
    op = '';
    right = null;
    resetActiveBtns();
    errorState = false;
    ans = null;
}

let resetActiveBtns = function() {
    let activeBtns = Array.from(document.getElementsByClassName('active'));
    activeBtns.forEach(function(btn) {
        btn.classList.remove('active');
    });
}

let addNumber = function(number) {
    if (display.innerText === '0') {
        display.innerText = number;
    } else {
        display.innerText += number;
    }
}

let backSpace = function() {
    let displayText = display.innerText;
    if (displayText.length > 1) {
        display.innerText = displayText.substring(0, displayText.length - 1);
    } else {
        display.innerText = '0';
    }
}

let evaluate = function() {
    right = parseFloat(display.innerText);
    let result = 0;
    switch (op) {
        case 'add':
            result = left + right;
            break;
        case 'subtract':
            result = left - right;
            break;
        case 'multiply':
            result = left * right;
            break;
        case 'divide':
            result = left / right;
            break;
    }
    op = '';
    left = result;
    right = null;
    resetActiveBtns();
}

document.getElementById('buttons').addEventListener('click', function(event) {
    let element = event.target;
    if (errorState) {
        reset();
    }
    if (element.classList.contains('number')) {
        if (ans !== null) {
            reset();
        }
        if (left === null && op !== '') {
            left = parseFloat(display.innerText);
            display.innerText = '0';
            resetActiveBtns();
        }
        addNumber(element.innerText);
    } else if (element.id === 'clear') {
        reset();
    } else if (element.id === 'backspace') {
        if (ans !== null) {
            reset();
        }
        // If an operator has been selected, but we are not in the middle of typing a number
        if (left === null && op !== '') {
            display.innerText = '0';
        } else {
            backSpace();
        }
    } else if (element.classList.contains('op')) {
        // If display is the RHS, first evaluate previous expression
        if (left !== null && op !== '') {
            evaluate();
            display.innerText = left;
            left = null;
        }
        resetActiveBtns();
        op = element.id;
        ans = null;
        element.classList.add('active');
    } else if (element.id === 'equals') {
        if (left !== null && op !== '') {
            evaluate();
            display.innerText = left;
            ans = left;
            left = null;
        } else if (left === null && op) {
            display.innerText = 'Syntax Error';
            resetActiveBtns();
            errorState = true;
        }
    }
});

reset();