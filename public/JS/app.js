class Calculator {
    constructor(previousTextElement,currentTextElement) {
        this.previousTextElement = previousTextElement;
        this.currentTextElement = currentTextElement;
        this.clear()
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    appendNumber(number) {
        if (number == '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    delete() {

    }

    updateDisplay() {
        this.currentTextElement.innerText = this.formatedOutput(this.currentOperand)
        this.previousTextElement.innerText = this.previousOperand
    }

    chooseOperation(operation) {
        if (this.currentOperand == '') return
        // checking if the previous content is not empty so as to compute and display data as well
        if (this.previousOperand != '')
        {
            this.compute()
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = ''
    }

    compute() {
        let computationalAnswer 
        let prev = parseFloat(this.previousOperand);
        let current = parseFloat(this.currentOperand);

        if (isNaN(prev) || isNaN(current)) return
        switch(this.operation) {
            case '+':
                 computationalAnswer = prev + current;
                 break;
            case '-':
                computationalAnswer = prev - current;
                break;
            case '×':
                computationalAnswer = prev * current;
                break;
            case '%':
                computationalAnswer = prev / current;
                break;
            default:
                return
        }
        this.currentOperand = computationalAnswer;
        this.operation = undefined;
        this.previousOperand = ''
    }

    getPercentage() {
        let percent 
        if(this.currentOperand == '') return
        this.currentOperand = this.currentOperand / 100;
        return percent;
    }

    checkState(state, component) {
        if(state)
        {
            component.classList.add('active')
        }
        else { component.classList.remove('active') }
    }

    formatedOutput(number) {
        const stringNumber = number.toString()
        const integerDigit = parseFloat(stringNumber.split('.')[0]);
        const decimalDigit = stringNumber.split('.')[1];
        let intergerDisplay
        if(isNaN(integerDigit))
        {
            intergerDisplay = ''
        } else {
            intergerDisplay = integerDigit.toLocaleString('en', {maximumFractionDigits: 0})
        }

        if(decimalDigit != null) {
            return  `${intergerDisplay}.${decimalDigit}`
        } else {
            return intergerDisplay
        }
    }

}

const buttons = document.querySelectorAll('.num-key');
const operators = document.querySelectorAll('.operator');
const pecentageButton = document.querySelector('.percent');
const equalToButton = document.querySelector('.equal');
const clearButton = document.getElementById('clear');
const previousTextElement = document.querySelector('.previous-content');
const currentTextElement = document.querySelector('.current-content');
let btnState = false;

const myCalculator = new Calculator(previousTextElement, currentTextElement);

buttons.forEach(button => {
    button.addEventListener('click', () => {
        myCalculator.appendNumber(button.innerText)
        myCalculator.updateDisplay()
        clearButton.innerText = 'C';
        btnState = false
        operators.forEach(operator => {
            operator.classList.remove('active')
        })
    })
})

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        myCalculator.chooseOperation(operator.innerText)
        myCalculator.updateDisplay()
        btnState = true
        myCalculator.checkState(btnState, operator)
    })
});

equalToButton.addEventListener('click', () => {
    myCalculator.compute()
    myCalculator.updateDisplay()
    
    clearButton.innerText = 'AC';
})

clearButton.addEventListener('click', () => {
    myCalculator.clear()
    myCalculator.updateDisplay()
    clearButton.innerText = 'AC'; 
})

pecentageButton.addEventListener('click', () => {
    myCalculator.getPercentage()
    myCalculator.updateDisplay()
})