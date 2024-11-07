import { backend } from 'declarations/backend';

const display = document.getElementById('display');
const loader = document.getElementById('loader');

window.appendToDisplay = (value) => {
    display.value += value;
};

window.clearDisplay = () => {
    display.value = '';
};

window.calculate = async () => {
    const expression = display.value;
    if (!expression) return;

    loader.classList.remove('d-none');

    try {
        const [num1, operator, num2] = parseExpression(expression);
        const result = await backend.calculate(num1, operator, num2);
        display.value = result.toString();
    } catch (error) {
        display.value = 'Error';
        console.error('Calculation error:', error);
    } finally {
        loader.classList.add('d-none');
    }
};

function parseExpression(expression) {
    const operators = ['+', '-', '*', '/'];
    let operator, num1, num2;

    for (let op of operators) {
        if (expression.includes(op)) {
            operator = op;
            [num1, num2] = expression.split(op).map(parseFloat);
            break;
        }
    }

    if (!operator || isNaN(num1) || isNaN(num2)) {
        throw new Error('Invalid expression');
    }

    return [num1, operator, num2];
}
