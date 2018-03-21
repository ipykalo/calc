let display = document.getElementById("result");
let actionResult = document.getElementById("show-actions");
let number = document.querySelectorAll("#number");
let actions = document.querySelectorAll("#action");
let memoryCurrentNumber = "";
let showFullAction = "";
let memoryPreviousNumber = 0;
let operationCurrent = "";
let operationPrevious = "";
let operationResult = true;
let resultOperation = 0;

number.forEach(item => {
	item.addEventListener("click", pressNumberButton);
});

actions.forEach(item => {
	item.addEventListener("click", pressActionButton);
});

function pressNumberButton(e) {
	let num = e.target.innerText;
	if (memoryCurrentNumber && memoryCurrentNumber.length >= 11) {
		resetCalculator();
	} else {
		memoryCurrentNumber += num;
		showFullAction += num;
		displayOperand(memoryCurrentNumber);
		displayOperation(showFullAction);
	}
}

function pressActionButton(e) {
	let symbol = e.target.innerText;
	switch (symbol) {
		case "+":
			if (memoryCurrentNumber && operationResult) {
				showFullAction += symbol;
				displayOperation(showFullAction);
				operationCurrent = symbol;

				if (
					operationCurrent === operationPrevious ||
					operationPrevious === ""
				) {
					writeIntoMemory(memoryCurrentNumber, operationCurrent);
				} else {
					changeOperator(operationPrevious, operationCurrent);
				}
			} else {
				pressActionButtonElse(symbol);
			}
			break;
		case "-":
			if (memoryCurrentNumber && operationResult) {
				showFullAction += symbol;
				displayOperation(showFullAction);
				operationCurrent = symbol;
				if (
					operationCurrent === operationPrevious ||
					operationPrevious === ""
				) {
					writeIntoMemory(memoryCurrentNumber, operationCurrent);
				} else {
					changeOperator(operationPrevious, operationCurrent);
				}
			} else {
				pressActionButtonElse(symbol);
			}
			break;
		case "×":
			if (memoryCurrentNumber && operationResult) {
				showFullAction += symbol;
				displayOperation(showFullAction);
				operationCurrent = symbol;

				if (
					operationCurrent === operationPrevious ||
					operationPrevious === ""
				) {
					writeIntoMemory(memoryCurrentNumber, operationCurrent);
				} else {
					changeOperator(operationPrevious, operationCurrent);
				}
			} else {
				pressActionButtonElse(symbol);
			}
			break;
		case "÷":
			if (memoryCurrentNumber && operationResult) {
				showFullAction += symbol;
				displayOperation(showFullAction);
				operationCurrent = symbol;

				if (
					operationCurrent === operationPrevious ||
					operationPrevious === ""
				) {
					writeIntoMemory(memoryCurrentNumber, operationCurrent);
				} else {
					changeOperator(operationPrevious, operationCurrent);
				}
			} else {
				pressActionButtonElse(symbol);
			}
			break;
		case "=":
			if (memoryCurrentNumber) {
				showFullAction += symbol;
				equalTo(memoryPreviousNumber);
			}
			break;
	}
}

function writeIntoMemory(value, operator) {
	operationCurrent = "";
	switch (operator) {
		case "+":
			memoryCurrentNumber = "";
			memoryPreviousNumber = memoryPreviousNumber + Number(value);
			operationPrevious = operator;
			break;
		case "-":
			memoryCurrentNumber = "";
			if (memoryPreviousNumber === 0) {
				memoryPreviousNumber = value;
				operationPrevious = operator;
			} else {
				memoryPreviousNumber = memoryPreviousNumber - value;
				operationPrevious = operator;
			}
			break;
		case "×":
			memoryCurrentNumber = "";
			if (memoryPreviousNumber === 0) {
				memoryPreviousNumber = value;
				operationPrevious = operator;
			} else {
				memoryPreviousNumber = memoryPreviousNumber * value;
				operationPrevious = operator;
			}
			break;
		case "÷":
			memoryCurrentNumber = "";
			if (memoryPreviousNumber === 0) {
				memoryPreviousNumber = value;
				operationPrevious = operator;
			} else {
				memoryPreviousNumber = memoryPreviousNumber / value;
				operationPrevious = operator;
			}
			break;
	}
}

function equalTo(value) {
	switch (operationPrevious) {
		case "+":
			resultOperation = (value * 100 + Number(memoryCurrentNumber) * 100) / 100;
			displayOperand(resultOperation);
			showFullAction += resultOperation;
			displayOperation(showFullAction);
			operationResult = false;
			memoryPreviousNumber = resultOperation;
			memoryCurrentNumber = "";
			break;
		case "-":
			resultOperation = value - memoryCurrentNumber;
			displayOperand(resultOperation);
			showFullAction += resultOperation;
			displayOperation(showFullAction);
			operationResult = false;
			memoryPreviousNumber = resultOperation;
			memoryCurrentNumber = "";
			break;
		case "×":
			resultOperation = value * memoryCurrentNumber;
			displayOperand(resultOperation);
			showFullAction += resultOperation;
			displayOperation(showFullAction);
			operationResult = false;
			memoryPreviousNumber = resultOperation;
			memoryCurrentNumber = "";
			break;
		case "÷":
			resultOperation = (value / memoryCurrentNumber).toFixed(2);
			displayOperand(resultOperation);
			showFullAction += resultOperation;
			displayOperation(showFullAction);
			operationResult = false;
			memoryPreviousNumber = resultOperation;
			memoryCurrentNumber = "";
			break;
	}
}

function displayOperand(value) {
	if (value.length >= 12) {
		resetCalculator();
	} else {
		display.innerText = value;
	}
}

function displayOperation(value) {
	if (value.length >= 22) {
		resetCalculator();
	} else {
		actionResult.innerText = value;
	}
}

function resetCalculator() {
	memoryCurrentNumber = "";
	showFullAction = "";
	memoryPreviousNumber = 0;
	operationCurrent = "";
	operationPrevious = "";
	operationResult = true;
	resultOperation = 0;
	display.innerText = memoryPreviousNumber;
	actionResult.innerText = "Digit Limit Met";
}

function changeOperator(lastOperation, currentOperation) {
	switch (lastOperation) {
		case "-":
			memoryPreviousNumber = memoryPreviousNumber - memoryCurrentNumber;
			memoryCurrentNumber = "";
			operationPrevious = currentOperation;
			break;
		case "+":
			memoryPreviousNumber = memoryPreviousNumber + Number(memoryCurrentNumber);
			memoryCurrentNumber = "";
			operationPrevious = currentOperation;
			break;
		case "×":
			memoryPreviousNumber = memoryPreviousNumber * memoryCurrentNumber;
			memoryCurrentNumber = "";
			operationPrevious = currentOperation;
			break;
		case "÷":
			memoryPreviousNumber = memoryPreviousNumber / memoryCurrentNumber;
			memoryCurrentNumber = "";
			operationPrevious = currentOperation;
			break;
	}
}

function pressActionButtonElse(sign) {
	showFullAction = "";
	showFullAction += resultOperation + sign;
	displayOperation(showFullAction);
	operationCurrent = sign;
	writeIntoMemory(memoryCurrentNumber, operationCurrent);
	operationResult = true;
}
