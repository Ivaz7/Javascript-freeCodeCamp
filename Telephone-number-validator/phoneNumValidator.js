// get every element
const input = document.querySelector('.input');
const result = document.querySelector('.result');
const checkBtn = document.querySelector('.check-btn');
const clearBtn = document.querySelector('.clear-btn');

// make enter as click button event
input.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    checkBtn.click();
  }
})

// main logic validator
checkBtn.addEventListener('click', () => {
  const inputVal = input.value;

  if (!inputVal) {
    alert('Please provide a phone number');
    return;
  };

  const regex = /^(1\s?)?(\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}$/;

  const rightResultHTML = `<p>Valid US number: ${inputVal}</p>`;
  const wrongResultHTML = `<p>Invalid US number: ${inputVal}</p>`;

  if (regex.test(inputVal)) {
    result.innerHTML += rightResultHTML;
  } else {
    result.innerHTML += wrongResultHTML;
  }
});


// clear the result
clearBtn.addEventListener('click', () => {
  result.innerHTML = '';
  input.value = '';
});