# malbec
<img align="left" width="128" height="128" src="malbec-logo.png">

> NOTE: This is just a practice project, usability and user-friendliness are not a priority right now.

'malbec' is a JavaScript package intended to make the execution of forward and back-propagation algorithms easier for my machine learning projects. It is also great as a procastination tool for when I don't feel like studying or doing homework :P

## Table of contents
- [malbec](#malbec)
  - [Table of contents](#table-of-contents)
  - [Usage](#usage)
    - [Structure](#structure)
    - [Creating networks](#creating-networks)
    - [Forward-propagation](#forward-propagation)
    - [Back-propagation](#back-propagation)
    - [Additional Functionality](#additional-functionality)
  - [Thanks?](#thanks?)

## Structure

malbec has a main class: "NNetwork" which is basically an array of "NLayers" with some syntactic sugar. Every NLayer has weights and biases that are randomly initialized (this and much more can be changed in [parameters](parameters)), which produce an output array through matrix math.

## Creating networks

malbec's main functionality is automatically ordering NLayer inputs and outputs to facilitate the NNetwork generation process.

**create([size, activation], [size, activation], [size, activation])**

The create command receives each layer as a list, each specifying its amount of neurons (size) and its activation function (activation).

```
var network = malbec.create([5], [4, 'relu'], [2, 'tanh']);
//Creates a neural net with three layers: 5 inputs, 4 hidden neurons and 2 outputs.
```

There are currently four activation functions: 'relu', 'tanh', 'sigmoid' (and none).


## Forward Propagation

Any NNetwork object can produce an output in one line, using the command:

**NNetwork.forward(input)**

```
let input = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]
outputs = network.forward(input); //Produces outputs from a list of five random numbers
```

The size of the input needs to be compatible with the first layer, missing or undefined elements will be treated as zeroes.

## Back Propagation

coming soon!

## Additional Functionality

### Encoding

NLayers can be encoded into a 'genome', returning their weights and biases as a readable array. This can be used to produce mutation, crossover and transfer learning.

**NLayer.genome()**

```
var genome = network[1].genome() //Stores weights and biases as an array
```

### Decoding

NLayers can read and match their parameters to those specified in a genome.

**NLayer.genome = genome**

```
network1[0].genome = network2[0].genome(); // Copies network2's first layer into network1's first layer
```
