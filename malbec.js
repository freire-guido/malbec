class NNetwork {
    constructor(layers) {
        this.layers = new Array(layers.length);
        this.layers[0] = new NLayer(layers[0][0], new Array(layers[0][0]), layers[0][1]);
        for (let i = 1; i < this.layers.length; i++) {
            this.layers[i] = new NLayer(layers[i][0], this.layers[i - 1].outputs, layers[i][1]);
        }
    }
    forward(input) {
        this.layers[0].forward(input);
        for (let i = 1; i < this.layers.length; i++) {
            this.layers[i].forward(this.layers[i - 1].outputs);
        }
        return this.layers[this.layers.length - 1].outputs;
    }
}
class NLayer {
    constructor(size, inputs, activation) {
        this.inputs = inputs;
        this.outputs = new Array(size);
        this.weights = new Array(size);
        this.biases = new Array(size);
        if (activation == 'tanh') {
            this.activate = function (z) {
                return Math.tanh(z);
            }
        } else if (activation == 'sigmoid') {
            this.activate = function (z) {
                return 1 / (1 + Math.exp(-z));
            }
        } else if (activation == 'relu') {
            this.activate = function (z) {
                if (z > 0) {
                    return z;
                } else {
                    return 0;
                }
            }
        } else if (activation == undefined) {
            this.activate = function (z) {
                return z;
            }
        } else {
            throw activation + ' is an invalid activation function';
        }
        //Initialize random weights and biases
        if (activation == undefined) {
            for (let o = 0; o < this.weights.length; o++) {
                this.weights[o] = new Array(this.inputs.length);
                this.biases[o] = 0;
                for (let i = 0; i < this.inputs.length; i++) {
                    this.weights[o][i] = 1;
                }
            }
        }
        else {
            for (let o = 0; o < this.weights.length; o++) {
                this.weights[o] = [];
                this.biases[o] = Math.random();
                for (let i = 0; i < this.inputs.length; i++) {
                    this.weights[o].push(Math.random());
                }
            }
        }
    }
    forward(inputs) {
        this.inputs = inputs;
        for (let o = 0; o < this.outputs.length; o++) {
            this.outputs[o] = 0;
            for (let i = 0; i < this.inputs.length; i++) {
                this.outputs[o] += this.inputs[i] * this.weights[o][i];
            }
            this.outputs[o] += this.biases[o];
            this.outputs[o] = this.activate(this.outputs[o]);
        }
    }
    get genome() {
        let genome = [];
        genome.push(this.biases);
        for (let o = 0; o < this.outputs.length; o++) {
            genome.push(this.weights[o]);
        }
        return genome;
    }
    set genome(genome) {
        this.weights = Array.from(genome.slice(1));
        this.biases = Array.from(genome[0]);
        for (let o = 0; o < this.weights.length; o++) {
            //8% mutation chance
            let dice = Math.random() * 100;
            if (dice < 8) {
                for (let i = 0; i < this.weights[o].length; i++) {
                    this.weights[o][i] = Math.random() * (Math.random() > 0.5 ? -1 : 1);
                }
                this.biases[o] = 0;
            }
        }
    }
}
var malbec = {
    create: function (...layers) {
        network = new NNetwork(layers);
        return network;
    },
    crossOver: function (...networks) {
        let dice = new Array(networks.length + 1)
        dice[0] = 0;
        for (let i = 0; i < networks.length; i++) {
            let bruh = [];
            networks[i].layers.forEach(NLayer => {
                dice[dice.length - 1] = NLayer.genome.length;
                for (let j = 0; j < dice.length; j++) {
                    if (dice[j] == undefined) {
                        dice[j] = (Math.floor(Math.random() * (dice[dice.length - 1] - dice[j - 1] + 1) + dice[j - 1]));
                    }
                }
                console.log(dice);
                bruh.push(NLayer.genome.slice(dice[i], dice[i + 1]))
            });
            console.log(bruh)
        }
    }
}
