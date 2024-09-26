let number1 = "";
let number2 = "";
let operand = "";
let expression = "";
let previousExpression = ""
let displayValue = 0;
let expressionArray = [];
const numberButtons = document.querySelectorAll(".number");
const operandButtons = document.querySelectorAll('.operand');
const numDisplay = document.getElementById("num-display");
const previousNumDisplay = document.getElementById("previous-num-display");
const equalsButton = document.getElementById("=");
const clearButton = document.getElementById("clear");

//add event listener for number buttons
numberButtons.forEach((button) => {
  button.addEventListener("click", function() {
    if (expression === 0){
      expression = button.id;
      numDisplay.innerText = expression
    } else {
    expression += button.id; 
    numDisplay.innerText = expression
    }
  })
});

//add event listener for operand buttons
operandButtons.forEach(button => {
  button.addEventListener('click', () => {
    // operand = button.innerText;
    // expression += ` ${button.id} `; // Add the operand (with spaces) to the expression
    // previousNumDisplay.innerText = numDisplay.innerText; // Update the display
    // previousExpression = expression;
    // expressionArray = previousExpression.split(" ");
    // number1 = parseFloat(expressionArray[0]);
    // expression = "";
    // numDisplay.innerText = expression;
  });
});

//clearButton functionality
clearButton.addEventListener('click', () => {
  number1 = 0;
  number2 = 0;
  operand = "";
  expression = 0;
  previousExpression = 0;
  numDisplay.innerText = "";
  previousNumDisplay.innerText = "";
})

//basic functions
function add(num1, num2) {
  return num1 + num2;
} 

function subtract(num1, num2) {
  return num1 - num2;
} 

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if (num2 === 0){
    return null;
  }
  return num1 / num2;
}

function percent(num1, num2){
  return (num1/100) * num2;
}

//function to decide which basic function to use
function operate(num1, num2, operand) {
  switch (operand) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      if (num2 === 0){
        return "Can not divide by 0";
      }
      return divide(num1, num2);
    case "%":
      return percent(num1, num2);
  }
}
