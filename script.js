const buttons = document.getElementsByClassName("button");
const input = document.getElementById("input");
const output = document.getElementById("output");

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("mousedown", () => {
      buttons[i].classList.toggle("onButtonPressed");
      buttons[i].classList.remove("hover-style");
    });
  
    buttons[i].addEventListener("mouseup", () => {
      buttons[i].classList.remove("onButtonPressed");
      buttons[i].classList.toggle("hover-style");
    });

    buttons[i].addEventListener("click", () => {
        if(buttons[i].classList.contains("digit")){
            input.textContent += buttons[i].textContent;
        }else if(buttons[i].textContent === "clr"){
            input.textContent = "";
            output.textContent = "";
        }else if(buttons[i].textContent === "←"){
            input.textContent = input.textContent.substring(0,input.textContent.length-1);
        }else if(buttons[i].textContent === "="){
            opParts = split(input.textContent);
            
            calc(opParts.digits,opParts.symbols);
        }
    });
  }

function split(operation){
    const symbols = [];
    const digits = [];
    current_digit = "";
    for(let i = 0; i < operation.length; i++){
        const char = operation.charAt(i);
        if(isMathSymbol(char)){
            symbols.push(char);
            digits.push(current_digit);
            current_digit = "";
        }else{
            current_digit += char;
        }
    }
    digits.push(current_digit);
    return {symbols,digits};
}

function calc(digits, symbols){
    let sym = [];
    let dig = [];
    let digAux = [];
    let symAux = [];
    let i;
    let symbol;
    for(i = 0; i < symbols.length; i++){
        symbol = symbols[i];
        if(symbol === "*" || symbol === "/"){
            if((i > 0 && symbols[i-1] !== "*" && symbols[i-1] !== "/") || i == 0)
                digAux.push(digits[i]);
            symAux.push(symbol);
            digAux.push(digits[i+1]);
        }else{
            if(digAux.length > 0){
                dig.push(operate(digAux,symAux));
                digAux = [];
                symAux = [];
            }else{
                dig.push(digits[i]);
            }
            sym.push(symbol);
        }
    }
    if(digAux.length > 0){
        dig.push(operate(digAux,symAux));
        digAux = [];
        symAux = [];
    }else{
        dig.push(digits[i]);
    }

    output.textContent = operate(dig,sym);

}
function operate(dig, sym){
    let result = parseFloat(dig[0]);
    for(let i = 1; i < dig.length; i++){
        const symbol = sym[i-1];
        const digit = parseFloat(dig[i]);
        if(symbol === "*"){
            result *= digit;
        }else if(symbol === "/"){
            result /= digit;
        }else if(symbol === "+"){
            result += digit;
        }else if(symbol === "-"){
            result -= digit;
        }
    }
    return result;
}

function isMathSymbol(char) {
    return char === "+" || char === "-" || char === "*" || char === "/";
}