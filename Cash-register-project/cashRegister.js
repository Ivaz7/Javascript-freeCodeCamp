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

// getting all the element from html
const inputElem = document.getElementById("cash");
const outputElem = document.getElementById("change-due");
const btnElem = document.getElementById("purchase-btn");
const totalCostElem = document.querySelector(".total-cost");
const listDrawerElem = document.querySelector(".drawer-list");

// generate html for cashier drawer list 
drawerCashierList();

function drawerCashierList() {
  totalCostElem.textContent = `Total cost: $${price}`;
  
  for (let i = 0; i < cid.length; i++) {
    listDrawerElem.innerHTML += `<div class="list">${cid[i][0]} : $${cid[i][1]}</div>`;
  }
}
