 let display = document.querySelector('.display');
        let currentOperation = null;
        let operand1 = '';
        let operand2 = '';
        let displayMode = 'binary';
        let history = [];
        let historyIndex = -1;

        function appendNumber(number) {
            if (currentOperation === null) {
                operand1 += number;
            } else {
                operand2 += number;
            }
            updateDisplay();
        }

        function chooseOperation(operation) {
            if (operand1 === '') return;
            currentOperation = operation;
            updateDisplay();
        }

        function calculate() {
            let result;
            if (operand1 === '' || operand2 === '' || currentOperation === null) {
                alert('Error: Please enter two operands and choose an operation.');
                return;
            }

            // Parse operands as integers
            const num1 = parseInt(operand1, 2);
            const num2 = parseInt(operand2, 2);

            switch (currentOperation) {
                case '&':
                    result = num1 & num2;
                    break;
                case '|':
                    result = num1 | num2;
                    break;
                case '^':
                    result = num1 ^ num2;
                    break;
                case '~':
                    result = ~num1;
                    operand2 = ''; // For bitwise NOT, clear operand2
                    break;
                case '<<':
                    result = num1 << num2;
                    break;
                case '>>':
                    result = num1 >> num2;
                    break;
                case '&&':
                    result = num1 && num2;
                    break;
                case '||':
                    result = num1 || num2;
                    break;
                default:
                    alert('Error: Invalid operation.');
                    return;
            }

            operand1 = result.toString(2); // Convert result back to binary string
            operand2 = '';
            currentOperation = null;
            history.push({ operand1, operand2, currentOperation, result });
            historyIndex = history.length - 1;
            updateDisplay();
        }

        function reset() {
            operand1 = '';
            operand2 = '';
            currentOperation = null;
            updateDisplay();
        }

        function nextOperation() {
            if (historyIndex < history.length - 1) {
                historyIndex++;
                let operation = history[historyIndex];
                operand1 = operation.operand1;
                operand2 = operation.operand2;
                currentOperation = operation.currentOperation;
                updateDisplay();
            }
        }

        function prevOperation() {
            if (historyIndex > 0) {
                historyIndex--;
                let operation = history[historyIndex];
                operand1 = operation.operand1;
                operand2 = operation.operand2;
                currentOperation = operation.currentOperation;
                updateDisplay();
            }
        }

        function setDisplayModeBinary() {
            displayMode = 'binary';
            updateDisplay();
        }

        function setDisplayModeBoth() {
            displayMode = 'both';
            updateDisplay();
        }

        function updateDisplay() {
    let displayValue = operand1 + (currentOperation !== null ? ' ' + currentOperation + ' ' : '') + operand2;
    if (displayMode === 'both') {
        let decimalValue = parseInt(displayValue, 2).toString(10);
        displayValue += ' (' + decimalValue + ')';
    }
    display.value = displayValue;
}

