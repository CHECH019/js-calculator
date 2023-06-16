const buttons = [...document.getElementsByClassName("button")];
const input = document.getElementById("input");
const output = document.getElementById("output");

buttons.forEach(b =>{
    b.addEventListener("mousedown", () => {
        b.classList.toggle("onButtonPressed");
        b.classList.remove("hover-style");
    });
    
    b.addEventListener("mouseup", () => {
        b.classList.remove("onButtonPressed");
        b.classList.toggle("hover-style");
    });
  
    b.addEventListener("click", () => {
        if(b.classList.contains("digit")){
            input.textContent += b.textContent;
        }else if(b.textContent === "clr"){
            input.textContent = "";
            output.textContent = "";
        }else if(b.textContent === "←"){
            input.textContent = input.textContent.substring(0,input.textContent.length-1);
        }else if(b.textContent === "="){
            output.textContent = calculate(input.textContent);            
        }
    });
    
})

function calculate(input) {
    // Step 1: Parse the input string
    const operands = input.match(/\d+\.?\d*/g).map(parseFloat);
    const operators = input.match(/[\+\-\*\/]/g);
    
    // Step 2: Evaluate multiplication and division
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === '*' || operators[i] === '/') {
            operands[i] = performOperation(operators[i],operands[i],operands[i+1]);
            operands.splice(i + 1, 1);
            operators.splice(i, 1);
            i--;
        }
    }

    // Step 3: Evaluate addition and subtraction
    let result = operands[0];
    for (let i = 1; i < operands.length; i++) {
        result = performOperation(operators[i-1],result,operands[i]);
    }

    return result;
}

function performOperation(operator, a , b){
    switch (operator) {
        case '*':
            return a*b;
        case '/':
            return a/b;
        case '+':
            return a+b;
        case '-':
            return a-b;
        default:
            throw new Error('Invalid operator: ' + operator);
    }
}