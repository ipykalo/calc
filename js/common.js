var numbers = document.querySelectorAll('.number');
var operations = document.querySelectorAll(".operate");
var clearBtns = document.querySelectorAll('.clear');
var decimalBtn = document.getElementById('decimal');
var display = document.getElementById('display');
var MenoryCurrentNumber = 0;
var MemoryNewNumber = false;
var MemoryPandingOperation = '';


for (i=0; i<numbers.length; i++) {
	var number = numbers[i];
	number.addEventListener('click', function (event){
		numberPress(event.target.innerText);
	});
};

for (i=0; i<operations.length; i++) {
	var operationBtn = operations[i];
	operationBtn.addEventListener('click', function(event){
		operation(event.target.innerText);
	});
};

for (i=0; i<clearBtns.length; i++) {
	var clearBtn = clearBtns[i];
	clearBtn.addEventListener('click', function(event){
		cleaner(event.target.innerText);
		
	});
};
	
	decimalBtn.addEventListener('click', decimal);



function numberPress(number){
	if(MemoryNewNumber){
		display.value = number;
		MemoryNewNumber = false;
	}
	else{
			if(display.value === '0'){
			display.value = number;
		} else{
			display.value += number;
		}
	}
	
};

function operation(op){
	var localOperationMemory = display.value;
	localOperationMemory = parseFloat(localOperationMemory);
	if(MemoryNewNumber && MemoryPandingOperation !== '='){
		display.value = MenoryCurrentNumber;
	} 
	else{
			MemoryNewNumber = true;
			if(MemoryPandingOperation === '+'){
				MenoryCurrentNumber = (MenoryCurrentNumber *10 + localOperationMemory * 10)/10;
			} 
			else if(MemoryPandingOperation === '-'){
				MenoryCurrentNumber -= localOperationMemory;
			} 
			else if(MemoryPandingOperation === '*'){
				MenoryCurrentNumber *= localOperationMemory;
			} 
			else if(MemoryPandingOperation === '/'){
				MenoryCurrentNumber /= localOperationMemory;
			} 
			else{
				MenoryCurrentNumber = localOperationMemory;
			}

			display.value = MenoryCurrentNumber;
			MemoryPandingOperation = op;
	};
	
};

function decimal(){
	var localDecimalMemory = display.value;
	if(MemoryNewNumber){
		localDecimalMemory = '0.';
		MemoryNewNumber = false;
	}
	else{
		if(localDecimalMemory.indexOf('.') === -1){
			localDecimalMemory += '.';
		}
	}
	display.value = localDecimalMemory;
};


function cleaner(id){
	if(id === 'CE'){
		display.value = '0';
		MemoryNewNumber = true;
	}
	else if(id === 'C'){
		display.value = '0';
		MemoryNewNumber = true;
		MenoryCurrentNumber = 0;
		MemoryPandingOperation = '';
	};
};





