let inputElem = document.querySelector('.js-input');
const buttonElem = document.querySelector('.js-btn');
const resultElem = document.querySelector('.js-result');

let currentMode = 'decimal'; // Default mode is decimal
let result = ''; // Define result in the outer scope

function validateInput() {
  const inputField = inputElem;
  let inputValue = inputField.value;

  // Validate input based on the current mode
  if (currentMode === 'binary') {
    // Allow only 0 and 1 for binary mode
    inputField.value = inputValue.replace(/[^01]/g, '');
  } else {
    // Allow only numbers for decimal mode
    inputField.value = inputValue.replace(/(?!^-)[^0-9]/g, '');
  }

  return inputField.value;
}

// make enter as click button event
inputElem.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    buttonElem.click();
  }
})

buttonElem.addEventListener('click', () => {
  result = ''; // Reset result each time the button is clicked
  let input = validateInput();

  // Convert binary input to decimal if necessary
  if (currentMode === 'binary') {
    input = binaryConverter(input);
  } else {
    input = parseInt(input);
  }

  // Filter for invalid input
  if (filterNum(input) === false) {
    return;
  }

  // Handle different ranges for Roman numeral conversion
  romanNumConverter(input);

  resultElem.innerHTML = result;
  resultElem.style.display = 'flex';
});

// Binary to Decimal Converter
function binaryConverter(binary) {
  if (binary === 0) {
    return 0;
  }

  return binaryConverter(Number(binary.toString().slice(1))) + Math.pow(2, binary.toString().split('').length - 1);
}

// Filter for input
function filterNum(input) {
  if (!input) {
    resultElem.innerHTML = 'Please enter a valid number';
    resultElem.style.display = 'flex';
    return false;
  }

  if (input < 0) {
    resultElem.innerHTML = 'Please enter a number greater than or equal to 1';
    resultElem.style.display = 'flex';
    return false;
  }

  if (input >= 4000) {
    resultElem.innerHTML = 'Please enter a number less than or equal to 3999';
    resultElem.style.display = 'flex';
    return false;
  }

  return true;
}

// Roman numeral conversion logic
const romanNumeral = [
  [1000, "M"], [900, "CM"],
  [500, "D"], [400, "CD"],
  [100, "C"], [90, "XC"],
  [50, "L"], [40, "XL"],
  [10, "X"], [9, "IX"],
  [5, "V"], [4, "IV"], [1, "I"]
]

function romanNumConverter(num) {
  for (let i = 0; i < romanNumeral.length; i++) {
    while (num >= romanNumeral[i][0]) {
      result += romanNumeral[i][1];
      num -= romanNumeral[i][0];
    };
  };
};

// Toggle input between decimal and binary
function toggleInput() {
  const inputField = document.querySelector('.js-input');

  // Toggle between 'decimal' and 'binary' mode
  if (currentMode === 'decimal') {
    currentMode = 'binary';
    inputField.placeholder = 'Enter binary number';
    inputField.value = ''; // Reset the input field
  } else {
    currentMode = 'decimal';
    inputField.placeholder = 'Enter decimal number';
    inputField.value = ''; // Reset the input field
  }
}
