let btns = document.querySelectorAll('.num-key');
let operators = document.querySelectorAll('.operator')
console.log(btns);

let currentContent = document.querySelector('.current-content');

let currentOperand = '';
let previousOperand = '';
let secondNumber = '';
let operandArray = [];

const isNumber = (number) => {
    if(isNaN(number))
    {
        console.log('error: ' + number + ' is not a number');
    }
}

btns.forEach(btn => {
    btn.addEventListener('click', (e)=>{
        
        currentOperand = btn.textContent.toString();
        if(currentContent.textContent === '0')
        {
            currentContent.textContent = '';
        }
        currentContent.textContent += currentOperand;
        
        operators.forEach(operator => {
            operator.addEventListener('click', (e) => {

                operator.classList.add('active')

                let temp = '';
                temp = currentOperand;
                previousOperand = temp;
                currentOperand = '';
                
                if (currentContent.textContent !== '')
                {
                    currentContent.textContent = '';
                }

                currentOperand += currentOperand;
                currentContent.textContent += currentOperand;
                
                secondNumber = currentContent.textContent.toString();
                console.log(currentContent)

                

                let operatorValue = operator.textContent;

                switch(operatorValue)
                {
                    case '+':
                        console.log('addition');
                        break;
                    case '-':
                        console.log('Subtraction');
                        break;
                    case '×':
                        console.log('multiplication');
                        break;
                    case '÷':
                        console.log('division');
                        break;
                }
            })
        })
        // Check if the current content has an operator
        
        console.log(previousOperand)
        console.log(currentOperand);
        console.log(secondNumber)
    })
})

