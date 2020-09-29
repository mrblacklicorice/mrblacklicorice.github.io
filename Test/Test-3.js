const brain = require('brainjs');

const network = new brain.NeuralNetwork();

network.train([{
    input: [1, 1],
    output: [0]
}, {
    input: [0, 0],
    output: [0]
}, {
    input: [1, 0],
    output: [1]
}, {
    input: [0, 1],
    output: [1]
}]);

console.log(Math.round(network.run([0,1])[0]));

