let displayValue = "0";
const buttons = document.querySelectorAll('button');
let n1 = null;
let n2 = null;
let sign = null;
let result = null;

window.addEventListener('keydown', (e) => {
  const key = document.querySelector(`button[data-key='${e.keyCode}']`);
  key.click();
});
  
function updateDisplay(){
  const display = document.querySelector('.display');
  if (displayValue.length < 14){ 
    display.textContent = displayValue;
  }
}

updateDisplay();

function clickButton() {
  buttons.forEach(button => { 
    button.addEventListener('click', function() {
      
    if(button.classList.contains('operand')){
      inputOperand(this.value);
      updateDisplay();
    }
    else if(button.classList.contains('operator')){
      inputOperator(this.value);
      updateDisplay();
    }
    else if(button.classList.contains('equals')){
      operate(n1,sign,n2);
      getResult();
      updateDisplay();
    }
    else if(button.classList.contains('clear')){
      clear();
      updateDisplay();
    }
    else if(button.classList.contains('plusMin')){
      plusMin();
      updateDisplay();
    }
    else if(button.classList.contains('modulo')){
      modulo();
      updateDisplay();
    }
    else if(button.classList.contains('decimal')){
      inputDecimal(this.value);
      updateDisplay();
    }
    });
  });
}

clickButton();

function inputOperand(value){
  
  if(displayValue == "0" && !sign || !sign && result){
    displayValue = value;
    n1 = parseFloat(displayValue)
    result = null;
    n2 = null;
  }
  else if(displayValue != "0" && !sign){
    displayValue += value;
    n1 = parseFloat(displayValue);
    result = null;
  }
  else if(displayValue === "Error"){
    clear();
    displayValue = value;
    n1 = parseFloat(displayValue);
  }
  else if(sign && !n2){
    displayValue = value;
    n2 = parseFloat(displayValue);
  }
  else if(sign && n2){ // I removed && n2 from this.
    displayValue += value;
    n2 = parseFloat(displayValue);
  }
  
}

function inputOperator(value){
 
  sign = value;
  
  if(displayValue == "0"){
    n1 = 0;
    n2 = 0;
    result = 0;
  }
  else if(displayValue === "Error") clear();
}

function add(n1,n2){
    if(n1 && n2 || n1 === 0 || n2 === 0) result = n1 + n2;
    else if(n1 && !n2) result = n1 + n1;
    sign = null;
    return round(result, 6);
}

function subtract(n1,n2){
    if(n1 && n2 || n1 === 0 || n2 === 0) result = n1 - n2;
    else if(n1 && !n2) result = n1 - n1;
    sign = null;
    return round(result, 6);
}

function multiply(n1,n2){
    if(n1 && n2 || n1 === 0 || n2 === 0) result = n1 * n2;
    else if(n1 && !n2) result = n1 * n1;
    sign = null;
    return round(result, 6);
}

function divide(n1,n2){
    if(n1 && n2 || n1 === 0 || n2 === 0) result = n1 / n2;
    else if(n1 && !n2) result = n1 / n1;
    sign = null;
    return round(result, 6);
}

function operate(n1, sign, n2){ // can i reduce them to one liners?
    
    if(sign === "+"){
        displayValue = '';
        displayValue += add(n1,n2);
    }
    else if(sign === "-"){
        displayValue = '';
        displayValue += subtract(n1,n2);
    }
    else if(sign === "*"){
        displayValue = '';
        displayValue += multiply(n1,n2);
    }
    else if(sign === '/' && n2 === 0) {
      displayValue = "Error";
    }
    else if(sign === "/"){
        displayValue = '';
        displayValue += divide(n1,n2);
    }
    
}

function clear(){
  displayValue = "0"; n1 = null; n2 = null;
  sign = null; result = null; countDecimal = null;
}

function plusMin(){
  displayValue = `${-displayValue}`;
  if(n1 && !n2) n1 = parseFloat(`${-n1}`);
  else if(n2 && sign) n2 = parseFloat(`${-n2}`);
}

function modulo(){
  displayValue = `${displayValue * 0.01}`;
  if(n1 && !n2) n1 = parseFloat(`${n1 * 0.01}`);
  else if(n2 && sign) n2 = parseFloat(`${n2 * 0.01}`);
}

function inputDecimal(dot) {
  
   if(!displayValue.includes(dot) && !result){ // Can i find a way to display 0.1 && make n1 = 0.1?
     displayValue += dot;
   }
}

function getResult() {
  if(result != null) n1 = result; n2 = null;
}

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}
