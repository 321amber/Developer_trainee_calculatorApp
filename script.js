let display = document.getElementById("display");
let buttons = document.querySelectorAll("button");

buttons.forEach((button)=>{
   button.addEventListener('click',(e)=>{
        let value = e.target.value;
        let id = e.target.id;

        if(id === "clear"){
            display.value = '';
        }
        else if(id === "Delete"){
            display.value = display.value.slice(0,-1);
        }
        else if(id === "equal"){
            let results = calculate(display.value);
            display.value = results;
        }
        else{
            display.value += value;
        }
   })
})

function calculate(expression){
    let operators = expression.replace(/[0-9.]/g,'');
    let numbers = expression.split(/[+\-\%\*\/]/).map(parseFloat);

    let firstNumber = numbers[0];
    if(isNaN(numbers[0])) return "error";

    for(let i=0; i<operators.length; i++){
        let secondNumber = numbers[i+1];

        if(operators[i] === '+'){
            firstNumber += secondNumber;
        }
        else if(operators[i] === '-'){
            firstNumber -= secondNumber;
        }
        else if(operators[i] === '*'){
            firstNumber *= secondNumber;
        }
        else if(operators[i] === '/'){
            if(secondNumber === 0){
                return "undefined";
            }
            else{
                firstNumber /= secondNumber;
            }
        }
        else if(operators[i] === '%'){
            firstNumber %= secondNumber;
        }
    }

    return parseFloat(firstNumber.toPrecision(10));
}