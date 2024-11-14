// get every element 
const inputTextElem = document.querySelector('.text-input');
const buttonCheckElem = document.querySelector('.check-btn');
const resultTextElem = document.querySelector('.text-result');

// make enter as click button event
inputTextElem.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    buttonCheckElem.click();
  }
})

// Palindrome main logic
buttonCheckElem.addEventListener("click", () => {
  let inputText = inputTextElem.value;
  let inputNormalize  = inputText.replace(/[\|\/\\\-:(),._ ]/g, '').toLowerCase();

  if (inputText === '') {
    alert('Please input a value')
    return;
  }

  let inputVal = [...inputNormalize];
  let fisrtArray = [];
  let LastArray = [];

  let halfLength = inputVal.length / 2;
  
  for (let i = 0; i < halfLength; i++) {
    fisrtArray.push(inputVal[i]);
  }

  let backLoopInputVal = inputVal.reverse();
  for (let j = 0; j < halfLength; j++) {
    LastArray.push(backLoopInputVal[j]);
  }

  // check if from the start and from the last text is the same
  if (
    fisrtArray.length === LastArray.length && fisrtArray.every((value, index) => value === LastArray[index])
  ) {
    resultTextElem.innerHTML = `<strong>${inputTextElem.value}</strong> is a Palindrome`;
  } else {
    resultTextElem.innerHTML = `<strong>${inputTextElem.value}</strong> is <strong>not</strong> a Palindrome`;
  }
});

