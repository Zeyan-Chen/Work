const funcA = x => x + 1
const funcB = x => {
	if ( x === 1 ) {
		x = 2;
	}
	return x + 1
}

console.log( funcA(1) ) //2
console.log( funcB(1) ) //undefined