let display = document.getElementById("display");
let buttons = document.querySelectorAll("button");

buttons.forEach((button)=>{
   button.addEventListener('click',(e)=>{
        let value = e.target.value;
        let id = e.target.id;

        if(display.value === "undefined"){
            display.value = "";
        }

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
    let numbers = [];
      let operators = [];
    let currString = '';
    let operatorArr = ['+', '-', '*','/'];

    for(let i=0; i<expression.length-1; i++){
        if((expression[i] === '-' || expression[i] === '+') && (expression[i+1] === '*' || expression[i] === '/')){
            return "invalid expression";
        }
    }
  
    for(let i=0; i<expression.length; i++){
        let prevOperator = i>0 ? expression[i-1] : null;
        let char = expression[i];

        if(!isNaN(char) || char === '.'){
            currString += char;
        }
        else{
            if(char === '-' && (i===0 || operatorArr.includes(prevOperator))){
                currString = '-';
            }
            else{
                if(currString != ''){
                    numbers.push(parseFloat(currString));
                    currString = '';
                }

                if(operatorArr.includes(prevOperator)){
                    operators[operators.length-1] = char;
                }
                else{
                    operators.push(char);
                }
            }
        }
       
    }
     if(currString != ''){
            numbers.push(parseFloat(currString));
        }

    console.log(`numbers: ${numbers}`);
    console.log(`operators : ${operators}`);
    
    //Operator precedence + calculation  
    for(let i=0;i<operators.length; i++){
        let prevNumber = numbers[i];
        let nextNumber = numbers[i+1];
        if(operators[i] === '*'){
            operators.splice(i,1);
            numbers[i] = prevNumber * nextNumber;
            numbers.splice(i+1,1);
            i--;
        }
        else if(operators[i] === '/'){
            if(nextNumber === 0) return "undefined";
            operators.splice(i,1);
            numbers[i] = prevNumber / nextNumber;
            numbers.splice(i+1,1);
            i--;
        }
    }
    let results = numbers[0];
    
    for(let i =0;i<operators.length; i++){
        let nextNumber = numbers[i+1];
        if(operators[i] === '+'){
            results += nextNumber;
        }
        else if(operators[i] === '-'){
            results -= nextNumber;
        }
    }

    return parseFloat(results.toPrecision(10));
}