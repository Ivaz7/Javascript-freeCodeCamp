// get every element
const inputElem = document.querySelector('.js-input');
const buttonElem = document.querySelector('.js-btn');
const resultELem = document.querySelector('.js-result');

// roman numeral logic converter
buttonElem.addEventListener('click', () => {
  let input = parseInt(inputElem.value);

  filterNum(input);

  if (filterNum(input) === false) {
    return;
  }

  resultELem.innerHTML = input;
  resultELem.style.display = 'flex';
})

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