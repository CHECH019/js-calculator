// Get DOM elements
const input = document.getElementById("input"); // Input field
const output = document.getElementById("output"); // Output field
const btns_container = document.getElementById('buttons-container'); // Buttons container

// Add event listeners to buttons container
btns_container.addEventListener('mousedown', e => {
    e.target.classList.replace('hover', 'onButtonPressed'); // Apply "onButtonPressed" style when button is pressed
});

btns_container.addEventListener("mouseup", (e) => {
    e.target.classList.replace('onButtonPressed', 'hover'); // Revert back to "hover" style when button is released
});

btns_container.addEventListener("click", (e) => {
    let b = e.target; // Clicked button

    if (b.classList.contains("digit")) {
        input.textContent += b.textContent; // Append clicked digit to input field
    } else if (b.textContent === "clr") {
        input.textContent = ""; // Clear input field
        output.textContent = ""; // Clear output field
    } else if (b.textContent === "←") {
        input.textContent = input.textContent.substring(0, input.textContent.length - 1); // Remove last character from input field
    } else if (b.textContent === "=") {
        // Parse input, validate, and calculate result
        let parsedInput = parseInput(input.textContent);
        const operands = parsedInput.operands;
        const operators = parsedInput.operators;
        let error = validate(operands, operators);
        output.textContent = error === '' ? calculate(operands.map(parseFloat), operators) : error; // shows the operation result if there's no errors, otherwise shows the error
    }
});

// Parse input string into operands and operators
const parseInput = input => {
    if (input.charAt(0) === '-') input = '0' + input; // Prepend '0' if input starts with a negative sign
    let operands = input.match(/\d+\.?\d*/g); // Extract numeric operands
    let operators = input.match(/[\+\-\*\/]/g); // Extract arithmetic operators

    if (operators === null && operands.length === 1) {
        operands.unshift('0'); // Prepend '0' if there are no operators and only one operand
        operators = ['+'];
    }

    return { operands, operators };
};

// Validate operands and operators for syntax and math errors
const validate = (operands, operators) => {
    if (operands === null || (operators !== null && operands.length - 1 !== operators.length)) {
        return 'Syntax Error'; // Invalid syntax if operands and operators don't match
    }
    if (operators.some((t, i) => t === '/' && operands[i + 1] == 0)) {
        return 'Math Error'; // Division by zero error
    }
    return ''; // return '' if there's no errors;
};

// Perform arithmetic calculations
const calculate = (operands, operators) => {
    // Step 1: Evaluate multiplication and division
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === '*' || operators[i] === '/') {
            operands[i] = performOperation(operators[i], operands[i], operands[i + 1]); // Perform operation
            operands.splice(i + 1, 1); // Remove next operand from array
            operators.splice(i, 1); // Remove operator from array
            i--; // Decrement index to account for removed elements
        }
    }

    // Step 2: Evaluate addition and subtraction
    let result = operands[0];
    for (let i = 1; i < operands.length; i++) {
        result = performOperation(operators[i - 1], result, operands[i]); // Perform operation
    }

    return (result + "").length > 10 ? parseFloat(result).toPrecision(10) : result; // Limit result to 10 decimal places
};

// Perform individual arithmetic operation
const performOperation = (operator, a, b) => {
    switch (operator) {
        case '*':
            return a * b;
        case '/':
            return a / b;
        case '+':
            return a + b;
        case '-':
            return a - b;
    }
};
