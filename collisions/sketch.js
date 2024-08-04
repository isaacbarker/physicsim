let particleA;
let particleB;

// initialize data for simulation
let massA = Math.floor(Math.random() * 5) + 1;
let massB = Math.floor(Math.random() * 5) + 1;
let velA = [Math.random() * (2 - 0.5) + 0.5, Math.random() * (2 - 0.5) + 0.5, Math.random() * (2 - 0.5) + 0.5];
let velB = [Math.random() * (2 - 0.5) + 0.5, Math.random() * (2 - 0.5) + 0.5, Math.random() * (2 - 0.5) + 0.5];
let posA = [-75, 0, 0];
let posB = [75, 0, 0];
let size = 2 * 60;
let e = 1;

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
  particleA = new Particle(massA, posA[0], posA[1], posA[2], velA[0], velA[1], velA[2]);
  particleB = new Particle(massB, posB[0], posB[1], posB[2], velB[0], velB[1], velB[2]);
}

function draw() {
  // disable loading screen on first draw
  pageLoaded()

  ambientLight(200);

  background(0);
  orbitControl();
  perspective(0.4, (width / height), 10, 500000)

  directionalLight(255, 0, 0, 0, 1, 0);
  directionalLight(0, 0, 255, 0, -1, 0);

  push()
  stroke(255, 0, 0)
  line(-size, 0, 0, size, 0, 0)
  stroke(0, 255, 0)
  line(0, -size, 0, 0, size, 0)
  stroke(0, 0, 255)
  line(0, 0, -size, 0, 0, size)
  pop();

  // update particles based on playing state
  if (!paused) {
    particleA.collide(particleB, e);

    particleA.update();
    particleB.update();

    particleA.edges(size);
    particleB.edges(size);
  }

  particleA.show();
  particleB.show();

  // end simulation when velocity < 0.001
  if (particleA.velocity.mag().toFixed(2) == 0 && particleB.velocity.mag().toFixed(2) == 0) {
    paused = true;
  }

  // update displayed information
  document.getElementById('Av').innerHTML = `V<sub>a</sub> = ${particleA.velocity.mag().toFixed(2)} m/s`;
  document.getElementById('Bv').innerHTML = `V<sub>b</sub> = ${particleB.velocity.mag().toFixed(2)} m/s`;
  document.getElementById('Am').innerHTML = `mass of A = ${particleA.mass.toFixed(2)} kg`;
  document.getElementById('Bm').innerHTML = `mass of B = ${particleB.mass.toFixed(2)} kg`;
}



