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
    if (justPressed == "number" || justPressed == "decimal"){
        calcDisplay.textContent += this.getAttribute("data-value");
    } else {
        calcDisplay.textContent = this.getAttribute("data-value");
    }
    justPressed = "number";
}

/**
 * Takes what's in the display text content and stores in variable ans
 */
function updateAns(){
    ans = parseFloat(calcDisplay.textContent);
    console.log(ans);
}

/**
 * When an operator (+,-,/,*) is pressed, stores the operator in variable op
 * and updates ans with what is currently in the display. Also sets display
 * to empty string. If an operator was just pressed previously, op is replaced
 * with value of new operation.
 */
function operatorPressed(){
    // only show updated calculation if previous button was not an operator or equal
    if (op && justPressed != "operator" && justPressed != "equal"){
        calculate();
    }

    op = this.getAttribute("data-value");
    previousOp[0] = op;
    updateAns();
    justPressed = "operator";
}

/**
 * When equal button is pressed, calculator does calculation and updates display
 * with answer.
 */
function calculate(){
    let a = ans;
    let b;
    let answer;

    // only calculate if operator is set
    if (previousOp.length){
        // repeatedly pressing equals will re-do previous operation
        if (justPressed == "equal" && previousOp.length == 2){
            op = previousOp[0];
            b = previousOp[1];
        } else {
            updateAns();
            b = ans;
        }
        answer = operate(op, a, b);
        ans = answer;
        calcDisplay.textContent = parseFloat(answer).toPrecision(8)/1;
        console.log(answer);
        previousOp = [op, b];
    }
    justPressed = "equal";
}

/**
 * Clears the current calculated value. Clears the current operation.
 * Clears the display.
 */
function clear(){
    ans = 0;
    op = "";
    previousOp = [];
    calcDisplay.textContent = '0';
    console.clear();
    justPressed = "";
}

/**
 * When decimal button is pressed, if not previously pressed, add
 * decimal to number in display
 */
function decimalPressed(){
    // to replace textcontent
    if (justPressed != "number"){
        calcDisplay.textContent = "0.";
    }
    // to add text content
    if (!calcDisplay.textContent.includes(".")){
        calcDisplay.textContent += ".";
    }
    justPressed = "decimal";
}

let ans = 0;
let op = "";
let previousOp = [];
let justPressed = "";
let opJustPressed = false;
let eqJustPressed = false;
let calcDisplay = document.querySelector(".calculator-display");
let numberButtons = document.querySelectorAll(".number-btn");
numberButtons.forEach(btn => btn.addEventListener('click', numberPressed));

let operateButtons = document.querySelectorAll(".operate-btn");
operateButtons.forEach(btn => btn.addEventListener('click', operatorPressed));

let equalButton = document.querySelector(".equal-btn");
equalButton.addEventListener('click', calculate);

let clearButton = document.querySelector(".clear-btn");
clearButton.addEventListener('click', clear);

let decimalButton = document.querySelector(".decimal-btn");
decimalButton.addEventListener('click', decimalPressed);