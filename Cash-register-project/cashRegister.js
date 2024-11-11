let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const coinsValue = [
  ['ONE HUNDRED', 100],
  ['TWENTY', 20],
  ['TEN', 10],
  ['FIVE', 5],
  ['ONE', 1],
  ['QUARTER', 0.25],
  ['DIME', 0.1],
  ['NICKEL', 0.05],
  ['PENNY', 0.01]
];

// getting all the element from html
const cash = document.getElementById("cash");
const changeDue = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");
const totalCostElem = document.querySelector(".total-cost");
const listDrawerElem = document.querySelector(".drawer-list");

// generate html for cashier drawer list 
drawerCashierList();

function drawerCashierList() {
  totalCostElem.textContent = `Total cost: $${price.toFixed(2)}`;
  listDrawerElem.innerHTML = '<p><strong>Change in drawer:</strong></p>';
  
  for (let i = 0; i < cid.length; i++) {
    listDrawerElem.innerHTML += `<div>${cid[i][0]} : $${cid[i][1].toFixed(2)}</div>`;
  }
}

// main logic when we click
purchaseBtn.addEventListener('click', () => {
  let cashVal = Math.round(Number(cash.value) * 100);
  let change = cashVal - Math.round(price * 100);
  let result = [];
  
  changeDueEmpty();
  
  if (change > totalDrawer()) {
    changeDue.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>";
    return;
  }
  
  if (lessCash(cashVal) === true || isTheSamePriceCash(cashVal) === true) {
    return;
  }
  
  // main logic try to find change
  changeDueResult(result, change);

  drawerCashierList();

  console.log(result)

  renderChange(result);
})

// make a alert if the cash from the customer less
// or the customer has the exact cash
function lessCash(cashVal) {
  if (cashVal < price * 100) {
    alert('Customer does not have enough money to purchase the item');
    return true;
  }
  return false;
}
function isTheSamePriceCash(cashVal) {
  if (cashVal === Math.round(price * 100)) {
    changeDue.innerHTML = "<p>No change due - customer paid with exact cash</p>";
    return true;
  }
  return false;
}
// total drawer cash
function totalDrawer() {
  return cid.reduce((total, item) => total + Math.round(item[1] * 100), 0);
}

// make change-due empty
function changeDueEmpty() {
  changeDue.innerHTML = '';
}

// main logic to find the change
function changeDueResult(result, change) {
  for (let i = 0; i < coinsValue.length; i++) {
    let cidValSame = cid.find(cid => coinsValue[i][0] === cid[0]);
    let coinName = coinsValue[i][0];
    let coinValue = Math.round(coinsValue[i][1] * 100);
    let amountUsed = 0;

    while (change >= coinValue && cidValSame[1] >= coinValue / 100) {
      cidValSame[1] = Math.round((cidValSame[1] - coinValue / 100) * 100) / 100;
      change -= coinValue;
      amountUsed += coinValue;
    }

    if (amountUsed > 0) {
      result.push([coinName, (amountUsed / 100).toFixed(2)]);
    }
  }
}

// render the change to output
function renderChange(result) {
  changeDue.innerHTML += '<p>Status: OPEN</p>';
  for (let i = 0; i < result.length; i++) {
    changeDue.innerHTML += `<p>${result[i][0]}: $${result[i][1]}</p>`;
  }
}