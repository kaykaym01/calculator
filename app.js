function multiply(a,b){
    return a*b;
}

function divide(a,b){
    return a/b;
}

function add(a, b){
    return a+b;
}

function subtract(a,b) {
    return a-b;
}

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
    }
    return answer;
}