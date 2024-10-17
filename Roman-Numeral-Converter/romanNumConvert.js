// get every element
const inputElem = document.querySelector('.js-input');
const buttonElem = document.querySelector('.js-btn');
const resultELem = document.querySelector('.js-result');

// roman numeral logic converter
buttonElem.addEventListener('click', () => {
  let input = parseInt(inputElem.value);
  let result = '';

  if (filterNum(input) === false) {
    return;
  }

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
      while (input > 5 && input < 9) {
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
      while (firstNum > 5 && firstNum < 9) {
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
      while (firstNum > 5 && firstNum < 9) {
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
    if (numLess1000  > 0 && numLess1000 < 10) {
      lessDozens(numLess1000);
    } else if (numLess1000 >= 10 && numLess1000 < 100) {
      lessHundred(numLess1000);
    } else if (numLess1000 >= 100) {
      lessThousand(numLess1000);
    }
  }

  if (input < 11) {
    lessDozens(input);
  } else if (input >= 10 && input < 100) {
    lessHundred(input);
  } else if (input >= 100 && input < 1000) {
    lessThousand(input);
  } else if (input >= 1000 && input < 4000) {
    lessFourThousand(input);
  }

  resultELem.innerHTML = result;
  resultELem.style.display = 'flex';
});


// make binary input into interger
function binaryConverter(num) {

}

// Filter for input
function filterNum(input) {
  if (!input) {
    resultELem.innerHTML = 'Please enter a valid number';
    resultELem.style.display = 'flex';
    return false;
  }
  
  if (input < 0) {
    resultELem.innerHTML = 'Please enter a number greater than or equal to 1'
    resultELem.style.display = 'flex';
    return false;
  }
  
  if (input >= 4000) {
    resultELem.innerHTML = 'Please enter a number less than or equal to 3999';
    resultELem.style.display = 'flex';
    return false;
  }

  return true;
}