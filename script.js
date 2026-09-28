//preview: python -m http.server

const BALL_COUNT = 5;

let balls = [];
let gravity = 1;

let boundsWidth = 800;

function setup() {
  createCanvas(windowWidth-100, windowHeight-100);
  background(30);
  for(let i = 0; i < BALL_COUNT; i++) {
    balls.push(new Ball(width / 2, height / 3, 40));
  }
}

function draw() {
  background(30);
  fill("blue");
  rect(width / 2 - boundsWidth / 2, 0, boundsWidth, height)

  myBall.update();   // Calculate physics
  myBall.checkKeys(); // Check for keyboard input
  myBall.display();    // Draw the ball
}

class Ball {
  constructor(x, y, r) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-500, 500), random(-50, 50));
    this.acc = createVector(0, 0);
    this.r = r;
    this.topSpeed = 60;
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
      //this.vel.y -= 5;
    }
  }

  display() {
    fill(255, 150, 0);
    noStroke();
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