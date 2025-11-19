const display = document.querySelector('.result');
const buttons = document.querySelector('.buttons');

let currentInput = '0';
let operator = null;
let previousInput = null;

buttons.addEventListener('click', (event) => {
    const button = event.target;
    const buttonValue = button.textContent;

    if (button.classList.contains('button')) {
        if (buttonValue >= '0' && buttonValue <= '9') {
            handleNumber(buttonValue);
        } else if (buttonValue === '.') {
            handleDecimal();
        } else if (button.classList.contains('operator')) {
            handleOperator(buttonValue);
        } else if (button.classList.contains('equals')) {
            handleEquals();
        }
    }
    updateDisplay();
});

function handleNumber(number) {
    if (currentInput === '0') {
        currentInput = number;
    } else {
        currentInput += number;
    }
}

function handleDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
}

function handleOperator(nextOperator) {
    if (nextOperator === 'C') {
        currentInput = '0';
        operator = null;
        previousInput = null;
        return;
    }

    if (nextOperator === '←') {
        currentInput = currentInput.slice(0, -1);
        if (currentInput === '') {
            currentInput = '0';
        }
        return;
    }

    if (operator && previousInput !== null) {
        handleEquals();
    }

    operator = nextOperator;
    previousInput = currentInput;
    currentInput = '0';
}

function handleEquals() {
    if (!operator || previousInput === null) {
        return;
    }

    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) {
        return;
    }

    let result;
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        case '%':
            result = prev % current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = null;
    previousInput = null;
}

function updateDisplay() {
    display.textContent = currentInput;
}