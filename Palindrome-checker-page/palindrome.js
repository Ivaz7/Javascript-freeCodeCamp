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

  if (inputText === '') {
    alert('Please input a value')
    return;
  }

  let inputNormalize  = inputText.replace(/[^a-z0-9A-Z]/g, '').toLowerCase();

  let i = 0;
  let j = inputNormalize.length - 1;

  while (i < Math.ceil((inputNormalize.length) / 2)) {
    if (inputNormalize[i] !== inputNormalize[j]) {
      resultTextElem.innerHTML = `<strong>${inputTextElem.value}</strong> is <strong>not</strong> a Palindrome`;      
      return;
    }

    i++
    j--
  }

  resultTextElem.innerHTML = `<strong>${inputTextElem.value}</strong> is a Palindrome`;
});

