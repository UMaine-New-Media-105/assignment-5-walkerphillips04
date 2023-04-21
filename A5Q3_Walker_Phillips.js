let meteors = [];
let breeders = [];
let catchers = [];

function setup() {
  createCanvas(960, 540);
  addX = 0.1;
  for (let i = 0; i < 60; i++) {
    let x = random(width);
    let y = random(height);
    let size = random(20, 50);
    meteors.push(new meteor(x, y, size));

    for (let i = 0; i < 10; i++) {
      let thisX = random(width);
      let thisY = random(height);
      breeders.push(new Breeder(thisX, thisY));

      for (let i = 0; i < 2; i++) {
        let thisX = random(width);
        let = random(height);
        catchers.push(new Catcher(thisX, thisY));
      }
    }
  }
}
class meteor {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.xSpeed = random(-1, 1);
    this.ySpeed = random(-1, 1);
  }

  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x + this.size / 2 > width) {
      this.x = width - this.size / 2;
      this.xSpeed *= -1;
    } else if (this.x - this.size / 2 < 0) {
      this.x = this.size / 2;
      this.xSpeed *= -1;
    }

    if (this.y + this.size / 2 > height) {
      this.y = height - this.size / 2;
      this.ySpeed *= -1;
    } else if (this.y - this.size / 2 < 0) {
      this.y = this.size / 2;
      this.ySpeed *= -1;
    }
  }

  update() {
    this.move();
    this.checkEdges();
  }

  show() {
    noStroke();
    fill("gray");
    rect(this.x, this.y, this.size);
  }

  checkEdges() {
    if (this.x > width || this.x < 1) {
      this.x = width - this.x;
    }
    if (this.y > height || this.y < 1) {
      this.y = height - this.y;
    }
  }
}

function draw() {
  background(10);
  for (let meteor of meteors) {
    meteor.update();
    meteor.show();
    for (let catcherShown = 0; catcherShown < 2; catcherShown++) {
      catchers[catcherShown].move();
      catchers[catcherShown].show();
    }
    for (let breederShown = 0; breederShown < 10; breederShown++) {
      breeders[breederShown].move();
      breeders[breederShown].show();
    }
  }
}

class Catcher {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.addX = addX;
  }
  move() {
    this.x = this.x + this.addX;
    this.y = this.y;
    let isTooFarLeft = this.x < 0;
    let isTooFarRight = this.x > width;
    if (isTooFarLeft || isTooFarRight) {
      this.addX = -this.addX;
      this.y = random(height);
    }
  }
  show() {
    push();
    translate(this.x, this.y);
    rotate(-HALF_PI); 
    scale(0.5); 

    // draw the spaceship body
    fill("orange");
    triangle(0, -85, -50, 35, 50, 35); 

    // draw the engines
    fill("gray");
    rect(-35, 15, 8, 30); 
    rect(30, 15, 8, 30); 
    pop();
  }
}

class Breeder {
  constructor(x, y,size) {
    this.x = x;
    this.y = y;
    this.addX = addX;
  }
  move() {
    this.x = this.x + this.addX;
    this.y = this.y;
    let isTooFarLeft = this.x < 0;
    let isTooFarRight = this.x > width;
    if (isTooFarLeft || isTooFarRight) {
      this.addX = -this.addX;
      this.y = random(height);
    }
  }
  show() {
    push();
    translate(this.x, this.y);
    fill("maroon");

    beginShape();
    for (let i = 0; i < 8; i++) {
      let angle = (i * TWO_PI) / 8;
      let x = 25 * cos(angle) + 20;
      let y = 25 * sin(angle) + 20;
      vertex(x, y);
    }
    endShape(CLOSE);
    // Draw space rock
    fill("red");
    strokeWeight(2);
    beginShape();
    for (let i = 0; i < 8; i++) {
      let angle = (i * TWO_PI) / 8;
      let x = 15 * cos(angle) + 20;
      let y = 10 * sin(angle) + 20;
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }
}
