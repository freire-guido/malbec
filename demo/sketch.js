/*
Uses the 'malbec' library to create and forward a set of random inputs, using a simple CNN.
The demo neural network has three layers: 5 inputs, 4 hidden neurons and 2 outputs.
Each layer has a different activation function.
- Guido Freire, 2020
*/

var network = malbec.create([5], [4, 'tanh'], [2, 'sigmoid']);
console.log(network);

for (let i = 0; i < 10; i++) {
  let inputs = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]
  outputs = network.forward(inputs);
  console.log(outputs);
}