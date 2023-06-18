const input = document.getElementById("input");
const output = document.getElementById("output");
const btns_container = document.getElementById('buttons-container');

btns_container.addEventListener('mousedown',e => {
    e.target.classList.replace('hover','onButtonPressed');
});
btns_container.addEventListener("mouseup", (e) => {
    e.target.classList.replace('onButtonPressed','hover');
});
btns_container.addEventListener("click", (e) => {
    let b = e.target;
    if(b.classList.contains("digit")){
        input.textContent += b.textContent;
    }else if(b.textContent === "clr"){
        input.textContent = "";
        output.textContent = "";
    }else if(b.textContent === "←"){
        input.textContent = input.textContent.substring(0,input.textContent.length-1);
    }else if(b.textContent === "="){
        let parsedInput = parseInput(input.textContent);
        const operands = parsedInput.operands;
        const operators = parsedInput.operators;
        let error = validate(operands,operators);
        output.textContent = error === '' ? calculate(operands.map(parseFloat),operators) : error;
    }
});

const parseInput = input => {
    if(input.charAt(0) === '-') input = '0'+input;
    let operands = input.match(/\d+\.?\d*/g);
    let operators = input.match(/[\+\-\*\/]/g);
    if (operators === null && operands.length === 1){
        operands.unshift('0');
        operators = ['+'];
    }
    return {operands,operators}
}

const validate = (operands, operators)=>{
    if(operands === null || operators !== null && operands.length-1 !== operators.length) return 'Syntax Error';
    if(operators.some((t,i) => t==='/' && operands[i+1] == 0)) return 'Math Error'
    return '';
}

const calculate = (operands, operators) => {
    // Step 1: Evaluate multiplication and division
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === '*' || operators[i] === '/') {
            operands[i] = performOperation(operators[i],operands[i],operands[i+1]);
            operands.splice(i + 1, 1);
            operators.splice(i, 1);
            i--;
        }
    }

    // Step 2: Evaluate addition and subtraction
    let result = operands[0];
    for (let i = 1; i < operands.length; i++) {
        result = performOperation(operators[i-1],result,operands[i]);
    }

    return (result+"").length > 10 ? parseFloat(result).toPrecision(10):result;
}
const performOperation = (operator, a , b) => {
    switch (operator) {
        case '*':
            return a*b;
        case '/':
            if(b == 0) throw new Error("Math Error: divison by zero");
            return a/b;
        case '+':
            return a+b;
        case '-':
            return a-b;
    }
}