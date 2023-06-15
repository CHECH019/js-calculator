// var u_name = prompt("what's r name?");
// document.write("Hey "+u_name+"!");
// var array = ["Sergio","Suarique", 26, true];
// array.push(1);
// array.unshift("0");
// array.pop();
// array.shift();
// array.forEach( t => console.log(t+"\n"));
// const container = document.getElementById("container");
// container.style.width = "300px";
// container.style.height = "300px";
// container.style.background = "#ff0";
// const entrada = document.getElementById("input");
// entrada.value = "HOLA";

const buttons = document.getElementsByClassName("button");
const display = document.getElementById("display");

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
            display.textContent += buttons[i].textContent;
        }else if(buttons[i].textContent === "clr"){
            display.textContent = "";
        }else if(buttons[i].textContent === "←"){
            display.textContent = display.textContent.substring(0,display.textContent.length-1);
        }else if(buttons[i].textContent === "="){
            opParts = split(display.textContent);
            
            operate(opParts.digits,opParts.symbols);
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

function isMathSymbol(char) {
    return char === "+" || char === "-" || char === "*" || char === "/";
}

//5+8*3/2-6*2 = 5
//0 1 2 3 4 5
//5 8 3 2 6 2
//+ * / - *
function operate(digits, symbols){
    console.log(digits);
    console.log("--------------------")
    console.log(symbols);
    let digAux = [];
    let symAux = [];
    for(let i = 0; i < symbols.length; i++){
        let symbol = symbols[i];
        if(symbol === "*" || symbol === "/"){
            if(i > 0 && symbols[i-1] !== "*" && symbols[i-1] !== "/")
                digAux.push(digits[i]);
            symAux.push(symbol);
            digAux.push(digits[i+1]);

        }else{
            if(digAux.length > 0){
                console.log(operate2(digAux,symAux))
                digAux = [];
                symAux = [];
            }
        }
    }
    if(digAux.length > 0){
        console.log(operate2(digAux,symAux))
        digAux = [];
        symAux = [];
    }

    
}
function operate2(dig, sym){
    let result = dig[0];
    for(let i = 1; i < dig.length; i++){
        const symbol = sym[i-1];
        const digit = parseFloat(dig[i]);
        if(symbol === "*"){
            result *= digit;
        }else if(symbol === "/"){
            result /= digit;
        }
    }
    return result;
}