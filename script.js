let number1 = "";
let number2 = "";
let operand = "";
let justCalculated = false;
let isChaining = false;
let numberEntered = false; // Tracks if a number is entered after an operand
let result;

const numberButtons = document.querySelectorAll(".number");
const operandButtons = document.querySelectorAll('.operand');
const numDisplay = document.getElementById("num-display");
const previousNumDisplay = document.getElementById("previous-num-display");
const equalsButton = document.getElementById("=");
const enterButton = document.getElementById("Enter");
const clearButton = document.getElementById("clear");
const deleteButton = document.getElementById("delete");
const decimal = document.getElementById("decimal");

//decimal point added
decimal.addEventListener('click', () => {
  numDisplay.innerText += "."
});


// Add event listener for number buttons
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (justCalculated) {
      // Start a new expression after an equals operation
      numDisplay.innerText = button.id;
      number1 = "";
      justCalculated = false;
      isChaining = false;
    } else {
      numDisplay.innerText += button.id;
    }
    numberEntered = true; // Mark that a number has been entered
  });
});

// Add event listener for operand buttons
operandButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (numberEntered && !justCalculated) {
      // If the user has entered a number and it's not immediately after equals
      if (isChaining && number1 !== "") {
        // Perform calculation if chaining operands
        number2 = parseFloat(numDisplay.innerText);
        let result = operate(number1, number2, operand);
        numDisplay.innerText = result; // Display the result
        previousNumDisplay.innerText = `${result} ${button.id}`; // Show the current equation
        number1 = result;  // Store result for the next calculation
      } else {
        number1 = parseFloat(numDisplay.innerText); // Set number1
        previousNumDisplay.innerText = `${number1} ${button.id}`; // Show operand
      }
      operand = button.id;  // Store the current operand
      numDisplay.innerText = "";  // Clear display for the next number input
      isChaining = true;  // Mark chaining mode
      numberEntered = false;  // Reset number entry
    } else if (justCalculated) {
      // After equals, chain from result
      operand = button.id;
      previousNumDisplay.innerText = `${number1} ${operand}`;
      isChaining = true;
      justCalculated = false;
      numDisplay.innerText = "";
    }
  });
});

// Equals button functionality
equalsButton.addEventListener('click', equalsButtonFunction);
enterButton.addEventListener('click', equalsButtonFunction);

//equals button functionality
function equalsButtonFunction() {
  if (isChaining && numberEntered) {
    number2 = parseFloat(numDisplay.innerText);
    if (number1 && number2 && operand) {
      let resultString = result = operate(number1, number2, operand).toString();
      if (resultString.length > 9){ // if answer is too long
        result = parseFloat(resultString.slice(0,9))
       }  else {
        result = parseFloat(resultString.slice(0, 9)) //return the first 9 numbers
       }
      previousNumDisplay.innerText = `${number1} ${operand} ${number2}`;
      numDisplay.innerText = result;
      number1 = result;  // Store the result for the next operation
      justCalculated = true;  // Set justCalculated flag
      isChaining = false;  // Stop chaining
    }
  }
}

// Basic arithmetic operations
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
  if (num2 === 0) {
    return "Cannot divide by 0";
  }
  return num1 / num2;
}

function operate(num1, num2, operand) {
  switch (operand) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
    default:
      return;
  }
}

// Clear button functionality
clearButton.addEventListener('click', () => {
  number1 = "";
  number2 = "";
  operand = "";
  justCalculated = false;
  isChaining = false;
  numDisplay.innerText = "";
  previousNumDisplay.innerText = "";
});

// Delete button functionality
deleteButton.addEventListener('click', () => {
  let string = numDisplay.innerText;
  numDisplay.innerText = string.slice(0, -1);
});

// Keydown functionality
window.addEventListener('keydown', function(e) {
  const key = document.querySelector(`button[data-key='${e.key}']`);
  key.click();
});
