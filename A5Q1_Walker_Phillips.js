let meteors = [];

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

function setup() {
  createCanvas(960, 540);
  for (let i = 0; i < 5; i++) {
    let x = random(width);
    let y = random(height);
    let size = random(20, 50);
    meteors.push(new meteor(x, y, size));
  }
}

function draw() {
  background(10);
  for (let meteor of meteors) {
    meteor.update();
    meteor.show();
  }
}
