let infix;
let i = 0,j = 0, idx = 0;
let k = 0, id = 0;
let endResult = 0; 
let fs = require('fs');
let arg = process.argv;

infix = fs.readFileSync(arg[2]);
infix = infix.toString();
let constOperation = '-+/*^';
let constNumbers = '0123456789';

let stack = [];
let polishString = [];

function priority(operation){
	if(operation == '+' || operation == '-'){
		return 0;
	}
	else if(operation == '/' || operation == '*'){
		return 1;
	}
	else if(operation == '^'){
		return 2;
	}
}

function calculation(operand1,operand2,operation){
	operand1 = Number(operand1);
	operand2 = Number(operand2);
	switch (operation){
		case '+':
			result = operand1 + operand2;
			return result;
		case '*':
			result = operand1 * operand2;
			return result;
		case '-':
			result = operand1 - operand2;
			return result;
		case '^':
			result = Math.pow(operand1,operand2);
			return result;
		case '/':
			if(operand2 == 0){
				console.log('	!Внимание вы поделили на 0! \n            ай-ай-ай-ай-ай-ай');
				return Infinity;
				break;
			}
			result = operand1 / operand2;
			return result;
	}
}

while(i < infix.length){
	if(infix[i] == '('){
		stack.push('(')
		i++;
	}
	if(infix[i] == ')'){
		while(stack[stack.length-1] != '('){
			polishString.push(stack.pop());
		}
		stack.splice(stack.length-1,1);
		i++;
	}
	if(constOperation.includes(infix[i])){
		stack.push(infix[i]);
		i++;
		j++;
	}
	if(!(constOperation.includes(infix[i]))){
		k = 0;
		let numb = '';
		for(let t = i;(constNumbers.includes(infix[t])); ++t){
			numb += infix[t]; 
			k++;
		}
		polishString.push(numb);
	}
	i += k;
	if(constOperation.includes(infix[i])){
		if(priority(stack[stack.length-1]) == priority(infix[i])){
			polishString.push(stack.pop());
			stack.push(infix[i]);
			i++;
		}
		else if (priority(stack[stack.length-1]) < priority(infix[i])){
			stack.push(infix[i]);
			i++;
		}
		else if (priority(stack[stack.length-1]) > priority(infix[i])){
			while (stack.length != 0){
				polishString.push(stack.pop());
			}
			
		}
		j++;
	}
	
}

while (stack.length != 0){
	polishString.push(stack.pop());
}

for(let t = 0; t < polishString.length; ++t){
	if(polishString[t] != ''){
		true;
	}
	else{
		polishString.splice(t,1);
	}
}

let polish = polishString.slice();

while(id <= j+1){
	if(!(constOperation.includes(polish[idx+2]))){
		idx++;
		id++;
		continue;
	}
	endResult = calculation(polish[idx],polish[idx+1],polish[idx+2]);
	polish.splice(idx,3,String(endResult));
	idx = 0;
	id++;
}

let polishStr = '';
for(let t = 0; t < polishString.length; ++t){
	polishStr += polishString[t];
}


for(let t = 0; t <infix.length; ++t){
	infix = infix.replace("^","**");
}

console.log('eval(): ',eval(infix));
console.log('postfix: ',polishStr,'=',endResult);