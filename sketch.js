var network = malbec.create([5], [4, 'tanh'], [2, 'tanh']);
function setup() {
  windowWidth -= 30;
  windowHeight -= 30;
  createCanvas(windowWidth, windowHeight);
  console.log(network);
}

function draw() {
  let inputs = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]
  network.forward(inputs);
}