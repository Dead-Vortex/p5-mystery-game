//preview: python -m http.server

//note to self: steal code from here
//https://editor.p5js.org/physics-mulberry/sketches/3RpaAxDdh

const BALL_COUNT = 10;

let balls = [];
let gravity = 1;

let boundsWidth = 800;

function setup() {
  createCanvas(windowWidth-50, windowHeight-50);
  background(30);
  if(width < 800) {
    boundsWidth = width * 0.75;
  }
  for(let i = 0; i < BALL_COUNT; i++) {
    let radius = random(30, 100);
    let xPos = random(width / 2 - boundsWidth / 2 + radius, width / 2 + boundsWidth / 2 - radius);
    let yPos = random(radius, height - radius);
    let c = color(random(255), random(255), random(255));
    balls.push(new Ball(xPos, yPos, radius, c));
  }
}

function draw() {
  background(30);
  fill("blue");
  rect(width / 2 - boundsWidth / 2, 0, boundsWidth, height)

  for(let i = 0; i < balls.length; i++) {
    balls[i].update();
    balls[i].checkKeys();
    balls[i].display();
  }
}

class Ball {
  constructor(x, y, r, color) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-500, 500), random(-50, 50));
    this.acc = createVector(0, 0);
    this.r = r;
    this.topSpeed = 60;
    this.color = color;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.y += gravity;
    this.vel.limit(this.topSpeed);
    this.pos.add(this.vel);

    this.vel.x *= 0.99;
    if(this.pos.y > height - this.r / 2) {
      this.pos.y = height - this.r / 2;
      this.vel.y *= -0.9;
    }
    if(this.pos.x > width / 2 + boundsWidth / 2 - this.r / 2) {
      this.pos.x = width / 2 + boundsWidth / 2 - this.r / 2;
      this.vel.x *= -0.9;
    }
    if(this.pos.x < width / 2 - boundsWidth / 2 + this.r / 2) {
      this.pos.x = width / 2 - boundsWidth / 2 + this.r / 2;
      this.vel.x *= -0.9;
    }
  }

  checkKeys() {
    if (keyIsDown(32)) {
      if(this.vel.x < 0) {
        this.vel.x -= 20;
      } else {
        this.vel.x += 20;
      }
      this.vel.y -= 5;
    }
  }

  display() {
    fill(this.color);
    // noStroke();
    ellipse(this.pos.x, this.pos.y, this.r);
  }
}

// function keyPressed() {
//   if (key === ' ') {
//     console.log("Spacebar was just pressed!");
//   }
  
//   if (key === 'w' || key === 'W') {
//     console.log("The W key was just pressed!");
//   }

//   if (keyCode === UP_ARROW) {
//     console.log("Up Arrow was just pressed!");
//   }
// }