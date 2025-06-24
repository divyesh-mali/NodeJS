const math = require('./math') // While importing, if you use './' then it will search in current directory but if you use 'math' then it will search in inbuilt nodejs library packages.

// const { addFn, subFn } = require('./math') // Just another way to import modules

console.log("Value of maths: ", math);
console.log("Add: ", math.addFn(5, 3));
console.log("Subtract: ", math.subtractFn(5, 3));