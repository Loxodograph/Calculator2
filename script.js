let number1 = "";
let number2 = "";
let operand = "";
let expression = "";
let previousExpression = "";
let string = "";
let answer;
const numberButtons = document.querySelectorAll(".number");
const operandButtons = document.querySelectorAll('.operand');
const numDisplay = document.getElementById("num-display");
const previousNumDisplay = document.getElementById("previous-num-display");
const equalsButton = document.getElementById("=");
const enterButton = document.getElementById("Enter");
const clearButton = document.getElementById("clear");
const deleteButton = document.getElementById("delete");
const decimal = document.getElementById("decimal");

decimal.addEventListener('click', () => {
  numDisplay.innerText += "."
})
//add event listener for number buttons
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    expression = numDisplay.innerText
    if (expression === ""){ // if theres no number entered
      expression = button.id; //button id is added to expression
      numDisplay.innerText = expression; // expression is displayed
    } else {
    expression += button.id; //if theres already a number entered
    numDisplay.innerText = expression //number is appended to expression
    };
    
  });
});

//add event listener for operand buttons
operandButtons.forEach(button => {
  button.addEventListener('click', () => {
    number2 = numDisplay.innerText
    if(number1 && (number2) && operand){

      equalsButtonFunction();
    } else if (!number2){
      return;
    }
      operand = button.id; //update operand
      previousExpression = numDisplay.innerText; //update new number1 to previous expression
      number1 = parseFloat(previousExpression);
      numDisplay.innerText = "";
      previousNumDisplay.innerText = `${previousExpression} ${operand}`; // previous number plus operand moved to previousDisplay
      expression = ""
      // equalsButtonFunction();
    })
  });


//add event listener for equals button
equalsButton.addEventListener('click', equalsButtonFunction);
enterButton.addEventListener('click', equalsButtonFunction)

//clearButton functionality
clearButton.addEventListener('click', clearButtonFunction);

//deleteButton functionality
deleteButton.addEventListener('click', deleteButtonFunction);



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
        clearButtonFunction();
        return "Can not divide by 0";
      }
      return divide(num1, num2);
    case "%":
      return percent(num1, num2);
  }
}

//function for buttons

function numberButtonFunction(button) {
  if (expression === ""){ // if theres no number entered
      expression = button.id; //button id is added to expression
      numDisplay.innerText = expression; // expression is displayed
    } else {
    expression += button.id; //if theres already a number entered
    numDisplay.innerText = expression //number is appended to expression
    }
};

function operandButtonFunction(operand) {

};

function clearButtonFunction() {
  //all variables set to 0
  number1 = 0;
  number2 = 0;
  answer = 0;
  operand = "";
  expression = "";
  previousExpression = "";
  numDisplay.innerText = "";
  previousNumDisplay.innerText = "";
};

 function equalsButtonFunction() {
    number2 = parseFloat(numDisplay.innerText);
    if (number1 !== null && number2 && operand) {  
      previousNumDisplay.innerText = `${number1} ${operand} ${number2}` //update previous number display to display whole equation
      answerString = operate(number1, number2, operand).toString(); //print out answer as string to be able to check length
      if (answerString.length > 9){ // if answer is too long
        answer = parseFloat(answerString.slice(0,9)) //return the first 9 numbers
        numDisplay.innerText = answerString.slice(0,9); //update the display
      } else {
        answer = parseFloat(answerString.slice(0, 9)) //return the first 9 numbers
      }
      number1 = parseFloat(answerString.slice(0, 9)); // update the display
      numDisplay.innerText = answer
      expression = "" //reset expression;
    }

 };

function deleteButtonFunction() {
  string = numDisplay.innerText;
  numDisplay.innerText = string.slice(0, (string.length - 1)); //remove last digit
  expression = numDisplay.innerText;
};

//key functionality
window.addEventListener('keydown', function(e){
  const key = document.querySelector(`button[data-key='${e.key}']`);
  key.click();
})