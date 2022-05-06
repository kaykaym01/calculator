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
 * Returns quotient of two numbers: a,b.
 * If b is 0, returns Error;
 * @param {*} a number 1
 * @param {*} b number 2
 * @returns a / b
 */
function divide(a,b){
    if (b == 0){
        return NaN;
    }
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
    if (calcDisplay.textContent == "-0"){
        calcDisplay.textContent = "-";
    }

    if (justPressed == "equal") {
        clear();
    }

    if (justPressed == "number" || justPressed == "decimal" || justPressed == "sign"){
        calcDisplay.textContent += this.getAttribute("data-value");
    }
    else {
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
    if (op && justPressed == "number"){
        calculate();
    }

    op = this.getAttribute("data-value");
    previousOp[0] = op;
    updateAns();
    justPressed = "operator";
}

function equalPressed(){
    calculate();
    justPressed = "equal";
}

/**
 * Runs calculate with ans, selected operation, and whatever
 * is in the display
 */
function calculate(){
    let a = ans;
    let b;
    let answer;

    // only calculate if operator is set
    if (previousOp.length){
        // repeatedly pressing equals will re-do previous operation
        if ((justPressed == "equal" || justPressed == "sign") && previousOp.length == 2){
            updateAns();
            a=ans;
            op = previousOp[0];
            b = previousOp[1];
        } else {
            updateAns();
            b = ans;
        }
        answer = operate(op, a, b);
        ans = answer;
        if (isNaN(answer)){
            calcDisplay.textContent = "Error";
        } else {
            calcDisplay.textContent = parseFloat(answer).toPrecision(8)/1;
        }
        console.log(answer);
        previousOp = [op, b];
    }
}

/**
 * 
 */
function clear(){
    resetCalculator();
    resetDisplay();
}

/**
 * Clears the current calculated value. Clears the current operation.
 * Clears the display.
 */
function resetCalculator(){
    ans = 0;
    op = "";
    previousOp = [];
    justPressed = "";
}

/**
 * 
 */
function resetDisplay(){
    calcDisplay.textContent = '0';
    console.clear();
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

/**
 * Function nto toggle positive and negative sign 
 */
function toggleSign(){
    if (justPressed == "operator"){
        calcDisplay.textContent = "0";
    }
    if (calcDisplay.textContent.includes("-")){
        calcDisplay.textContent  = calcDisplay.textContent.substring(1);
    } else{
        calcDisplay.textContent = "-" + calcDisplay.textContent;
    }
    justPressed = "sign";
}

let ans = 0;
let op = "";
let previousOp = [];
let justPressed = "";
let calcDisplay = document.querySelector(".calculator-display");
let numberButtons = document.querySelectorAll(".number-btn");
numberButtons.forEach(btn => btn.addEventListener('click', numberPressed));

let operateButtons = document.querySelectorAll(".operate-btn");
operateButtons.forEach(btn => btn.addEventListener('click', operatorPressed));

let equalButton = document.querySelector(".equal-btn");
equalButton.addEventListener('click', equalPressed);

let clearButton = document.querySelector(".clear-btn");
clearButton.addEventListener('click', clear);

let decimalButton = document.querySelector(".decimal-btn");
decimalButton.addEventListener('click', decimalPressed);

let signButton = document.querySelector(".sign-btn");
signButton.addEventListener('click', toggleSign);