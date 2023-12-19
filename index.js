const display = document.getElementById('display');
let left = 0;
let op = '';
let clearFlag = false;

let reset = function() {
    display.innerText = '0';
    left = 0;
    op = '';
    clearFlag = false;
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
    let right = parseFloat(display.innerText);
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
}

document.getElementById('buttons').addEventListener('click', function(event) {
    let element = event.target;
    if (element.classList.contains('number')) {
        if (left && op === '') {
            reset();
        }
        if (op !== '') {
            clearFlag = true;
        }
        if (clearFlag) {
            display.innerText = '0';
            clearFlag = false;
        }
        addNumber(element.innerText);
    } else if (element.id === 'clear') {
        reset();
    } else if (element.id === 'backspace') {
        if (clearFlag) {
            display.innerText = '0';
            clearFlag = false;
        }
        backSpace();
    } else if (element.classList.contains('op')) {
        if (op && clearFlag) {
            evaluate();
            display.innerText = left;
        } else {
            left = parseFloat(display.innerText);
        }
        op = element.id;
    } else if (element.id === 'equals') {
        if (op !== '' && !clearFlag) {
            evaluate();
            display.innerText = left;
            clearFlag = true;
        } else {
            clearFlat = true;
            display.innerText = 'Syntax Error';
        }
    }
});

reset();