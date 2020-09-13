class NLayer {
    constructor(size, inputs, position) {
        this.inputs = inputs;
        this.outputs = new Array(size);
        this.weights = new Array(size);
        this.biases = new Array(size);
        this.pos = position;
        //Initialize random weights and biases
        if (this.pos != 0) {
            for (let o = 0; o < this.weights.length; o++) {
                this.weights[o] = [];
                this.biases[o] = Math.random();
                for (let i = 0; i < this.inputs.length; i++) {
                    this.weights[o].push(Math.random());
                }
            }
        }
        else {
            for (let o = 0; o < this.weights.length; o++) {
                this.weights[o] = new Array(this.inputs.length);
                this.biases[o] = 0;
                for (let i = 0; i < this.inputs.length; i++) {
                    this.weights[o][i] = 1;
                }
            }
        }
    }
    //Matrix max
    forward(inputs) {
        this.inputs = inputs;
        if (this.pos > 0) {
            for (let o = 0; o < this.outputs.length; o++) {
                this.outputs[o] = 0;
                for (let i = 0; i < this.inputs.length; i++) {
                    this.outputs[o] += this.inputs[i] * this.weights[o][i];
                }
                this.outputs[o] += this.biases[o];
                this.outputs[o] = activate(this.outputs[o]);
            }
        }
        else {
            for (let i = 0; i < this.outputs.length; i++) {
                this.outputs[i] = this.inputs[i];
            }
        }
        //tanh activation function
        function activate(z) {
            return Math.tanh(z);
        }
    }
    //Returns weights and biases as a list
    get genome() {
        let genome = [];
        genome.push(this.biases);
        for (let o = 0; o < this.outputs.length; o++) {
            genome.push(this.weights[o]);
        }
        return genome;
    }
    //Sets all parameters to the ones specified in the genome
    set encode(genome) {
        this.weights = Array.from(genome.slice(1));
        this.biases = Array.from(genome[0]);
        for (let o = 0; o < this.weights.length; o++) {
            //8% mutation chance
            let dice = random(100);
            if (dice < 8) {
                for (let i = 0; i < this.weights[o].length; i++) {
                    this.weights[o][i] = random(-1, 1);
                }
                this.biases[o] = 0;
            }
        }
    }
}
var malbec = {
    create: function (...layers) {
        network = new Array(layers.length);
        network[0] = new NLayer(layers[0], new Array(layers[0]), 0);
        for (let i = 1; i < network.length; i++) {
            network[i] = new NLayer(layers[i], network[i - 1].outputs, i);
        }
        return network
    }
}
