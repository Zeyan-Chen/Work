function test() {
  let a = 10
}

if (true) {
  const b = 20
}

for(let i = 0; i < 10; i++) {
	console.log(i);
}

// console.log(a); // a is not defined 存取不到
console.log('final', i); // b is not defined 存取不到