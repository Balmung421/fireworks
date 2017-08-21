class Firework {
  constructor(location) {
    this.location = location;
    this.force = createVector(random(-0.01, 0.01), 0);
    this.rocket = new Rocket(location);
  }

  run() {
    this.rocket.run(this.force);
  }

  isFinished() {
    return this.rocket.isFinished();
  }
}

class Rocket {
  constructor(location) {
    this.location = location;
    this.width = 3;
    this.height = 6;
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, -5);
    this.fuel = random(50, 115);
    this.payload = new Payload(this.location);
  }

  run(force) {
    this.applyForce(force);
    this.update();
    this.display();
  }

  applyForce(force) {
    this.acceleration.add(force.copy());
  }

  update() {
    if(this.fuel > 0) {
      this.velocity.add(this.acceleration);
      this.location.add(this.velocity);
      this.acceleration.mult(0);

      this.fuel -= 1;
    } else {
      this.payload.run();
    }
  }

  display() {
    noStroke();
    fill(255, 255, 255, 50);
    if(this.fuel > 0) {
      rect(this.location.x, this.location.y, this.width, this.height);
    }
  }

  isFinished() {
    return this.payload.isDone();
  }
}

class Payload {
  constructor(location) {
    this.location = location;
    this.sparks = [];
    const color = this.randomColor();

    for(let i = 0; i < 25; i++) {
      this.sparks.push(new Spark(this.location, color));
    }
  }

  randomColor() {
    const red = random(0, 256);
    const green = random(0, 256);
    const blue = random(0, 256);
    return {red, green, blue};
  }

  run() {
    this.sparks.forEach((spark, i) => {
      spark.run();
      if(spark.isDead()) this.sparks.splice(i, 1);
    });
  }

  isDone() {
    return this.sparks.length === 0;
  }
}

class Spark {
  constructor(location, color) {
    this.startingLocation = location;
    this.location;
    this.size = 3;
    this.color = color;
    this.launched = false;
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.timeToLive = 50;
  }

  run() {
    this.update();
    this.display();
  }

  update() {
    if(!this.launched) {
      this.location = this.startingLocation.copy();
      this.launched = true;
    }

    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);

    this.timeToLive -= 1;
  }

  display() {
    noStroke();
    fill(this.color.red, this.color.green, this.color.blue);
    ellipse(this.location.x, this.location.y, this.size);
  }

  isDead() {
    return this.timeToLive <= 0;
  }
}
