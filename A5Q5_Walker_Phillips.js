let meteors = [];
let breeders = [];
let catchers = [];

function setup() {
  createCanvas(960, 540);
  Speed = 0.1;
  for (let i = 0; i < 60; i++) {
    let x = random(width);
    let y = random(height);
    let size = random(20, 50);
    meteors.push(new meteor(x, y, size));

    for (let i = 0; i < 10; i++) {
      let x = random(width);
      let y = random(height);
      let size = random(10, 30);
      let speed = random(-3, 3);
      breeders.push(new Breeder(x, y, size, speed));

      for (let i = 0; i < 2; i++) {
        let thisX = random(width);
        let = random(height);
        catchers.push(new Catcher(x, y));
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
  for (let i = 0; i < breeders.length; i++) {
    breeders[i].move();
    breeders[i].show();
    for (let j = i + 1; j < breeders.length; j++) {
      if (isTouching(breeders[i], breeders[j])) {
        breeders[i].size *= 2;
      }
    }
  }
}
for (let i = 0; i < catchers.length; i++) {
  catchers[i].move();
  catchers[i].show();
  for (let j = i + 1; j < catchers.length; j++) {
    if (isTouching(catchers[i], catchers[j])) {
      catchers[i].size *= 3;
    }
  }
}

class Catcher {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.Speed = Speed;
  }
  move() {
    this.x = this.x + this.Speed;
    this.y = this.y;
    let isTooFarLeft = this.x < 0;
    let isTooFarRight = this.x > width;
    if (isTooFarLeft || isTooFarRight) {
      this.Speed = -this.Speed;
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
  constructor(x, y, size, speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
  }

  move() {
    this.x += this.speed;
    if (this.x < 0 || this.x > width) {
      this.speed *= -1;
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
      let x = this.size * cos(angle) + 20;
      let y = this.size * sin(angle) + 20;
      vertex(x, y);
    }
    endShape(CLOSE);

    fill("red");
    strokeWeight(2);
    beginShape();
    for (let i = 0; i < 8; i++) {
      let angle = (i * TWO_PI) / 8;
      let x = this.size * 0.6 * cos(angle) + 20;
      let y = this.size * 0.4 * sin(angle) + 20;
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }
}
function isTouching(breeder1, breeder2) {
  let distance = dist(breeder1.x, breeder1.y, breeder2.x, breeder2.y);
  if (distance < breeder1.size + breeder2.size) {
    return true;
  } else {
    return false;
  }
}
function isTouching(catcher1, catcher2) {
  let distance = dist(catcher1.x, catcher1.y, catcher2.x, catcher2.y);
  if (distance < catcher1.size + catcher2.size) {
    return true;
  } else {
    return false;
  }
}
