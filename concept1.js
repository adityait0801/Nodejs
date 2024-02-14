// 1 way of concept 

// console.log("Calculate");

// const x = require('./concept2')

// const sum = x[0];
// const product = x[1];

// const result1 = sum(6,3);
// const result2 = product(6,3);

// console.log(result1);

// console.log(result2); 

// console.log("Calculate");

// const [sum, product] = require('./concept2')

// const result1 = sum(6,3);
// const result2 = product(6,3);

// console.log(result1);

// console.log(result2);

// if we reverse the const [product] = require('./concept2') then output will be 5 because from the importing file the sum is at index 0 so thayt we will be exporting and will be recievd at the imorting end.

// 2nd way 

// console.log("Calculate");

// const {product, sum} = require('./concept2')

// const result1 = sum(6,3);
// const result2 = product(6,3);

// console.log(result1);

// console.log(result2);

console.log("Calculate");

const {product, sum} = require('./concept2')

const result1 = sum(6,3);
const result2 = product(6,3);

console.log(result1);

console.log(result2);