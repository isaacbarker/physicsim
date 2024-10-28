// define simulation variables
const e = 1.6e-19;
const E0 = 8.85e-12;
const k = 8.99e+9;
let charges = []
let isMeasure = false;
const SF = 0.015

// drag variables
let currentDragIndex = null;

// measure variables
let startingPos = null;
let measurements = []


// view variables
let viewWidth;
let viewHeight;

function setup() {
	if (window.innerWidth < 800) {
		viewWidth = window.innerWidth * 0.9
		viewHeight = window.innerHeight * 0.75;
	} else {
		viewWidth = window.innerWidth * 0.5;
		viewHeight = document.getElementById('ctrl').offsetHeight;
	}

  if (viewHeight < window.innerHeight * 0.75) {
    viewHeight = window.innerHeight * 0.75
  }

	// add charge in the centre of the sketch
	let charge = new Charge(e, createVector(viewWidth/2, viewHeight/2));
  charges.push(charge)

	createCanvas(viewWidth, viewHeight, document.getElementById('sketch'));
}


function draw() {
  // disable loading screen on first draw
  pageLoaded()

  background(0)

  // for each grid square calculate resultant electrical field.
  for (let i = 15; i < viewWidth; i+=30) {
    for (let j = 15; j < viewHeight; j+=30) {

      let pos = createVector(i, j);
      let res = getVecE(pos);

      // draw arrow
      let sf = 1e10;
      
      let E = res.mag();

      // draw arrow 
      let length = 15;
      if (E * sf < length) {
        length = E * sf;  
      } 

      let origin = pos;
      let direction = res;
      
      direction.normalize().mult(length)
      drawArrow(origin, direction, length)
    }
  }

  for (let i = 0; i < charges.length; i++) {
    let charge = charges[i];

    // draw charge
    if (charge.charge < 0) {
      fill(255, 0, 0);
    } else if (charge.charge == 0) {
      fill(0, 0, 255);
    } else if (charge.charge > 0) {
      fill(0, 255, 0);
    }

    noStroke()
    circle(charge.pos.x, charge.pos.y, 15)

  }

  // draw measurement lines if enabled
  if (isMeasure && startingPos !== null) {
    let pos = createVector(mouseX, mouseY);
    // main ruler
    stroke(255, 255, 0);
    strokeWeight(2)
    line(startingPos.x, startingPos.y, pos.x, pos.y)
    // indents
    let dist  = pos.dist(startingPos);
    let dir = p5.Vector.sub(pos, startingPos);
    dir.normalize();

    for (let i = 0; i < dist; i+=(1/SF)) {
      let mark = p5.Vector.add(startingPos, p5.Vector.mult(dir, i));
      fill(255, 255, 0);
      let normal = createVector(dir.y, -dir.x).mult(5);
      let bottomPoint = p5.Vector.sub(mark, normal);
      let topPoint = p5.Vector.add(mark, normal);
      line(bottomPoint.x, bottomPoint.y, topPoint.x, topPoint.y)
    }
  }

}

function getVecE(pos) {
  let res = createVector(0, 0)

  for (let i = 0; i < charges.length; i++) {
    let charge = charges[i];
    res.add(charge.strength(pos));
  }

  return res;
}

function getV(pos) {
  let V = 0;

  for (let i = 0; i < charges.length; i++) {
    let charge = charges[i];
    V += charge.potential(pos);
  }

  return V;

}

function mouseDragged() {

  if (isMeasure) {
    measure();
  } else {
    drag();
  }

}

function mouseReleased() {

  if (isMeasure) {
    // log measurement
    let pos = createVector(mouseX, mouseY);

    let E = getVecE(pos).mag();
    let r = pos.dist(startingPos) * SF;
    let V = getV(pos);

    let measurement = [E, r, V]
    measurements.push(measurement);

    let list = document.getElementById('table-data')
    let tr = document.createElement('tr');
    // add collision in table
    measurement.forEach((d) => {
      let td = document.createElement('td');
      if (d > 0.001) {
        td.innerHTML = d.toFixed(2);
      } else {
        td.innerHTML = d.toExponential(2);
      }
      tr.appendChild(td)
    })

    list.appendChild(tr);
    startingPos = null;
  } else {
    currentDragIndex = null;
  }
}

// drag system
function drag() {
  let pos = createVector(mouseX, mouseY);

  // check position is within canvas
  if (!((pos.x > 0 && pos.x < viewWidth) && (pos.y > 0 && pos.y < viewHeight))) {
    return;
  }

  // drag currently selected charge
  if (currentDragIndex !== null) {
    charges[currentDragIndex].pos = pos;
  } else {
    for (let i = 0; i < charges.length; i++) {

      let chargePos = charges[i].pos;

      if (pos.dist(chargePos) < 20) {
        currentDragIndex = i;
        charges[currentDragIndex].pos = pos;
      }

    }
  }
}

// measure system
function measure() {

  let pos = createVector(mouseX, mouseY);
  
  if (startingPos !== null) {
    
    let E = getVecE(pos).mag();
    let r = pos.dist(startingPos) * SF;
    let V = getV(pos);

    document.getElementById('E').innerHTML = `E = ${E.toExponential(2)} N/C`;
    document.getElementById('r').innerHTML = `d = ${r.toFixed(2)} m`;
    document.getElementById('V').innerHTML = `V = ${V.toExponential(2)} V`
  } else {
    startingPos = pos;
  }

}

function drawArrow(base, vec) {
  push();
  stroke(150);
  strokeWeight(3);
  fill(255);
  
  // Draw the arrow body
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  
  // Draw the arrowhead
  let arrowSize = 1;
  let angle = atan2(vec.y, vec.x);
  translate(vec.x, vec.y);
  rotate(angle);
  beginShape();
  vertex(0, 0);
  vertex(-arrowSize, arrowSize / 2);
  vertex(-arrowSize, -arrowSize / 2);
  endShape(CLOSE);
  
  pop();
}