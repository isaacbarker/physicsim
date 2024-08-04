// define simulation variables
let particle;
let e = 1;
let G = 9.81;
let mass = 1;
let pos = [0, -10, 0];
let vel = [0, -20, 0];
let size = 120;

const DT = 1/60;
let paused = false;

function setup() {
  let viewWidth;
  let viewHeight;

  if (window.innerWidth < 600) {
    viewWidth = window.innerWidth * 0.9
    viewHeight = window.innerHeight * 0.75;
  } else {
    viewWidth = window.innerWidth * 0.5
    viewHeight = document.getElementById('ctrl').offsetHeight;
  }

  createCanvas(viewWidth, viewHeight, WEBGL, document.getElementById('sketch'));
  particle = new Particle(mass, createVector(pos[0], pos[1], pos[2]), createVector(vel[0], vel[1], vel[2]), createVector(0, G, 0))
}

function draw() {
  // disable loading screen on first draw
  pageLoaded()

  debugMode();
  orbitControl();
  perspective(0.4, (width / height), 10, 500000)
  background(0);
  ambientLight(150);

  // draw floor
  push();
  noStroke();
  translate(0, 2, 0);
  fill(255, 255, 255)
  box(size*2, 2, size*2);
  pop();
  
  // update particle based on playing state
  if (!paused) {
    particle.update();
  }

  // pause simulation when particle's y velocity is 0 or falls outside of sim size
  if (particle.vel.y == 0) {
    paused = true;
  }

  if (particle.pos.x < -size || particle.pos.x > size) {
    paused = true;
  }

  if (particle.pos.z < -size || particle.pos.z > size) {
    paused = true;
  }

  particle.show();

  // update displayed information
  document.getElementById('vx').innerHTML = `v<sub>x</sub> = ${particle.vel.x.toFixed(2)} m/s`;
  document.getElementById('vy').innerHTML = `v<sub>y</sub> = ${particle.vel.z.toFixed(2)} m/s`;
  document.getElementById('vz').innerHTML = `v<sub>z</sub> = ${-particle.vel.y.toFixed(2)} m/s`;
  document.getElementById('a').innerHTML = `a<sub>z</sub> = ${particle.a.mag().toFixed(2)} m/s<sup>2</sup>`;
  document.getElementById('h').innerHTML = `s<sub>z</sub> = ${(-particle.pos.y - particle.r).toFixed(2)} m`;
}