let fireworks = [];
let numFireworks;
let interval;
let numFinally;

function setup() {
  createCanvas(900, 600);
  numFireworks = 50;
  interval = setInterval(() => {
    addFirework();
    numFireworks -= 1;
  }, random(500, 1000));
  numFinally = 100;
}

function draw() {
  background(0);
  fireworks.forEach((firework, i) => {
    firework.run();
    line(0, height-1, width, height-1);
    if(firework.isFinished()) fireworks.splice(i, 1);
  });

  if(numFireworks <= 0) {
    if(interval) {
      clearInterval(interval);
      interval = null;
    }

    if(numFinally > 0) {
      addFirework();
      numFinally -= 1;
    }
  }
}

function addFirework() {
  const location = createVector(random(50, width-50), height);
  fireworks.push(new Firework(location));
}
