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
  if (input < 11) {
    lessDozens(input);
  } else if (input >= 10 && input < 100) {
    lessHundred(input);
  } else if (input >= 100 && input < 1000) {
    lessThousand(input);
  } else if (input >= 1000 && input < 4000) {
    lessFourThousand(input);
  }

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
function lessDozens(input) {
  if (input < 4) {
    while (input > 0) {
      result += 'I';
      input--;
    }
  } else if (input === 4) {
    result += 'IV';
  } else if (input === 5) {
    result += 'V';
  } else if (input > 5 && input < 9) {
    result += 'V';
    while (input > 5) {
      result += 'I';
      input--;
    }
  } else if (input === 9) {
    result += 'IX';
  }
}

function lessHundred(input) {
  if (input === 10) {
    result += 'X';
    return;
  }

  const inputArray = [...String(input)];
  let firstNum = parseInt(inputArray[0]);

  if (firstNum < 4) {
    while (firstNum > 0) {
      result += 'X';
      firstNum--;
    }
  } else if (firstNum === 4) {
    result += 'XL';
  } else if (firstNum === 5) {
    result += 'L';
  } else if (firstNum > 5 && firstNum < 9) {
    result += 'L';
    while (firstNum > 5) {
      result += 'X';
      firstNum--;
    }
  } else if (firstNum === 9) {
    result += 'XC';
  }

  let numLess10 = parseInt(inputArray[1] || 0);
  lessDozens(numLess10);
}

function lessThousand(input) {
  const inputArray = [...String(input)];
  let firstNum = parseInt(inputArray[0]);

  if (firstNum < 4) {
    while (firstNum > 0) {
      result += 'C';
      firstNum--;
    }
  } else if (firstNum === 4) {
    result += 'CD';
  } else if (firstNum === 5) {
    result += 'D';
  } else if (firstNum > 5 && firstNum < 9) {
    result += 'D';
    while (firstNum > 5) {
      result += 'C';
      firstNum--;
    }
  } else if (firstNum === 9) {
    result += 'CM';
  }

  let numLess100 = parseInt(inputArray.slice(1).join('') || 0);
  if (numLess100 > 0 && numLess100 < 10) {
    lessDozens(numLess100);
  } else if (numLess100 >= 10) {
    lessHundred(numLess100);
  }
}

function lessFourThousand(input) {
  const inputArray = [...String(input)];
  let firstNum = parseInt(inputArray[0]);

  if (firstNum < 4) {
    while (firstNum > 0) {
      result += 'M';
      firstNum--;
    }
  }

  let numLess1000 = parseInt(inputArray.slice(1).join('') || 0);
  if (numLess1000 > 0 && numLess1000 < 10) {
    lessDozens(numLess1000);
  } else if (numLess1000 >= 10 && numLess1000 < 100) {
    lessHundred(numLess1000);
  } else if (numLess1000 >= 100) {
    lessThousand(numLess1000);
  }
}

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
