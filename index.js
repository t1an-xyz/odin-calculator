const display = document.getElementById('display');

let reset = function() {
    display.innerText = '0';
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
        reset();
    }
}

document.getElementById('buttons').addEventListener('click', function(event) {
    let element = event.target;
    if (element.classList.contains('number')) {
        addNumber(element.innerText);
    } else if (element.id === 'clear') {
        reset();
    } else if (element.id === 'backspace') {
        backSpace();
    }
});

reset();