let display = document.getElementById("result");
let actionResult = document.getElementById("show-actions");
let number = document.querySelectorAll("#number");
let actions = document.querySelectorAll("#action");
let memoryCurrentNumber = "";
let showFullAction = "";
let showFullActionLength = "";
let memoryPreviousNumber = 0;
let operation = "";
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
	if (memoryCurrentNumber && memoryCurrentNumber.length >= 12) {
		resetCalculator();
	} else {
		memoryCurrentNumber += num;
		showFullAction += num;
		showFullActionLength = showFullAction;
		displayOperand(memoryCurrentNumber);
		displayOperation(showFullAction);
	}
}

function pressActionButton(e) {
	let symbol = e.target.innerText;
	console.log(e.target.innerText);
	switch (symbol) {
		case "+":
			if (memoryCurrentNumber && operationResult) {
				showFullAction += symbol;
				showFullActionLength = showFullAction;
				displayOperation(showFullActionLength);
				operation = symbol;
				writeIntoMemory(memoryCurrentNumber);
			} else {
				showFullAction = "";
				showFullActionLength = "";
				showFullAction += resultOperation + symbol;
				showFullActionLength = showFullAction;
				displayOperation(showFullActionLength);
				operation = symbol;
				writeIntoMemory(memoryCurrentNumber);
				operationResult = true;
			}
			break;
		case "-":
			if (memoryCurrentNumber) {
				showFullAction += symbol;
				showFullActionLength = showFullAction;
				displayOperation(showFullActionLength);
				operation = symbol;
				writeIntoMemory(memoryCurrentNumber);
			}
			break;
		case "=":
			if (memoryCurrentNumber) {
				showFullAction += symbol;
				showFullActionLength = showFullAction;
				equalTo(memoryPreviousNumber);
			}
			break;
	}
}

function writeIntoMemory(num) {
	memoryCurrentNumber = "";
	memoryPreviousNumber = memoryPreviousNumber + Number(num);
}

/*function subtract(num) {
	memoryPreviousNumber = memoryPreviousNumber - num;
	console.log(memoryPreviousNumber);
	//display.innerText = memoryPreviousNumber;
}*/

function equalTo(arg) {
	switch (operation) {
		case "+":
			resultOperation = arg + Number(memoryCurrentNumber);
			displayOperand(resultOperation);
			showFullActionLength = showFullAction + resultOperation;
			displayOperation(showFullActionLength);
			operationResult = false;
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
	showFullActionLength = "";
	memoryPreviousNumber = 0;
	operation = "";
	operationResult = true;
	resultOperation = 0;
	display.innerText = memoryPreviousNumber;
	actionResult.innerText = "Digit Limit Met";
}
