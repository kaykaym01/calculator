/**
 * Returns product of two numbers: a,b
 * @param {*} a number 1
 * @param {*} b number 2
 * @returns a * b
 */
function multiply(a,b){
    return a*b;
}

/**
 * Returns quotient of two numbers: a,b
 * @param {*} a number 1
 * @param {*} b number 2
 * @returns a / b
 */
function divide(a,b){
    return a/b;
}

/**
 * Returns sum of two numbers: a, b
 * @param {*} a number 1
 * @param {*} b number 2
 * @returns a + b
 */
function add(a, b){
    return a+b;
}

/**
 * Returns subtraction of two numbers: a,b
 * @param {*} a number 1
 * @param {*} b number 2
 * @returns a - b
 */
function subtract(a,b) {
    return a-b;
}

/**
 * Returns answer of a "operator" b where operator
 * is one of {*, /, +, -}
 * @param {*} operator The operation to calculate between a and b
 * @param {*} a number 1
 * @param {*} b number 2
 * @returns a "operator" b
 */
function operate(operator, a, b){
    let answer;
    switch(operator){
        case "*":
            answer = multiply(a,b);
            break;
        case "/":
            answer = divide(a,b);
            break;
        case "+":
            answer = add(a,b);
            break;
        case("-"):
            answer = subtract(a,b);
            break;
        default:
            answer = a;
            break;
    }
    return answer;
}

/**
 * Updates calculator display as numbers are pressed.
 * If display has 0 or is empty, number pressed replaces current display text content.
 * If the last pressed button was an operator, number pressed replaces current display text content.
 */
function numberPressed(){
    if (calcDisplay.textContent.trim() == "" || 
        calcDisplay.textContent.trim() == "0" ||
        opJustPressed){
        calcDisplay.textContent = this.getAttribute("data-value");
    } else {
        calcDisplay.textContent += this.getAttribute("data-value");
    }
    opJustPressed = false;
}

/**
 * Takes what's in the display text content and stores in variable ans
 */
function updateAns(){
    ans = parseInt(calcDisplay.textContent);
    console.log(ans);
}

/**
 * When an operator (+,-,/,*) is pressed, stores the operator in variable op
 * and updates ans with what is currently in the display. Also sets display
 * to empty string. If an operator was just pressed previously, op is replaced
 * with value of new operation.
 */
function operatorPressed(){
    if (op && !opJustPressed){
        calculate();
    }

    op = this.getAttribute("data-value");
    updateAns();
    opJustPressed = true;
}

/**
 * When equal button is pressed, calculator does calculation and updates display
 * with answer.
 */
function calculate(){
    let a = ans;
    updateAns();
    let b = ans;
    let answer = operate(op, a, b);
    op = "";
    calcDisplay.textContent = answer;
    console.log(answer);
}

let ans = 0;
let op = "";
let opJustPressed = false;
let calcDisplay = document.querySelector(".calculator-display");
let numberButtons = document.querySelectorAll(".number-btn");
numberButtons.forEach(btn => btn.addEventListener('click', numberPressed));

let operateButtons = document.querySelectorAll(".operate-btn");
operateButtons.forEach(btn => btn.addEventListener('click', operatorPressed));

let equalButton = document.querySelector(".equal-btn");
equalButton.addEventListener('click', calculate);