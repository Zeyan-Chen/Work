const aString = 'test';

function aFunction(){
  console.log('function test')
};

const aObject = {a: 1};

class aClass {
  constructor(name, age){
    this.name = name
    this.age = age
  }
};

function bFunction(){
  console.log('function test')
}; 

export {aString, aFunction, aObject, aClass};

export default bFunction;