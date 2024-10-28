// simulation variables
let c;
let pos;
let v;
let r = 83.33;

// rendering variables
let points = [];
let rotationalRef = false;
let angularPriority = false;
let accelerationPriority = true;
let paused = false;
let cam;

function setup() {

    let viewWidth;
    let viewHeight;

    if (window.innerWidth < 800) {
        viewWidth = window.innerWidth * 0.9;
        viewHeight = window.innerHeight * 0.75;
    } else {
        viewWidth = window.innerWidth * 0.6;
        viewHeight = document.getElementById('ctrl').offsetHeight;
    }

    if (viewHeight < window.innerHeight * 0.75) {
        viewHeight = window.innerHeight * 0.75
    }

    createCanvas(viewWidth, viewHeight, WEBGL, document.getElementById('sketch'));

    // initalize simulation variables
    v = createVector(0, 0, 10)
    c = createVector(0, 0, 0);
    pos = createVector(c.x - r, 0, 0);
}

function draw() {
    pageLoaded();
    background(0);
    directionalLight(255, 0, 0, 0, 1, 0);
    ambientLight(200)

    // draw mass
    push();
    fill(200, 200, 0)
    translate(pos)
    sphere(10, 128, 128)
    pop();

    // change frame of reference if needed
    if (rotationalRef) {
        cam = createCamera();
        cam.camera(pos.x, pos.y - 800, pos.z, pos.x, pos.y, pos.z, pos.x, pos.y, pos.z);
        cam.ortho();
    } else {
        perspective(0.4, (width / height), 10, 500000)
        orbitControl();
    }

    // draw centre
    push();
    translate(c);
    stroke(255, 255, 255, 200);
    line(-r, 0, 0, r, 0, 0);
    line(0, -10, 0, 0, 10, 0);
    line(0, 0, -r, 0, 0, r);
    pop();

    // add previous point as history
    if (!paused) {
        points.push(pos.copy());
    }

    if (!paused) {
        // update velocity and acceleration
        if (angularPriority) {
            let angularVelocity = parseFloat(document.getElementById('omega-input').value)
            let vMag = angularVelocity * r;
            v = v.normalize().mult(vMag);
            document.getElementById('v-input').value = vMag;
        } else {
            v = v.normalize().mult(parseFloat(document.getElementById('v-input').value));
            let angularVelocity = v.mag() / r
            document.getElementById('omega-input').value = angularVelocity;
        }

        pos.add(v)
    }

    // draw velocity arrow
    drawArrow(pos, v, 5, 10, [255, 0, 0])

    let centripetalAcceleration = p5.Vector.sub(c, pos).normalize();
    centripetalAcceleration.mult(Math.pow(v.mag(), 2) / r)

    if (!paused) {
        v.add(centripetalAcceleration)
    }

    // draw centripetal force
    drawArrow(pos, centripetalAcceleration, 5, 20, [0, 255, 0])

    // draw centrifugal force if in rotational reference
    if (rotationalRef) {
        drawArrow(pos, p5.Vector.mult(centripetalAcceleration, -1), 5, 20, [0, 255, 0])
    }

    // update r
    if (accelerationPriority) {
        let a = document.getElementById('a-input').value;
        let expectedR = Math.pow(v.mag(), 2) / a;
        r = expectedR;
        document.getElementById('r-input').value = expectedR;
    } else {
        r = document.getElementById('r-input').value;
        document.getElementById('a-input').value = centripetalAcceleration.mag();
    }
    
    for (let i = 0; i < points.length; i++) {
        let opacity  = ((i) / points.length) * 100;
        push();
        fill(255, 0, 0, opacity)
        noStroke();
        translate(points[i])
        sphere(10, 10, 128);
        pop();
    }

    // remove oldest point
    if (points.length > 20) {
    points.shift()
    }

    document.getElementById('v').innerHTML = `v = ${v.mag().toFixed(2)} ms<sup>-1</sup>`;
    let angularVelocity = (v.mag() / p5.Vector.dist(pos, c));
    document.getElementById('omega').innerHTML = `ω = ${angularVelocity.toFixed(2)} rads<sup>-1</sup>`
    document.getElementById('a').innerHTML = `a<sub>centripetal</sub> = ${(Math.pow(v.mag(), 2) / p5.Vector.dist(pos, c)).toFixed(2)} ms<sup>-2</sup>`;
    document.getElementById('r').innerHTML = `r = ${p5.Vector.dist(pos, c).toFixed(2)} m`

}

// draw vector arrows
function drawArrow(base, vec, arrowSize, scale, colour) {
    push();
    translate(base.x, base.y, base.z);
    let dir = vec.copy().normalize();
    let len = vec.mag() * scale;

    // rotate the arrow
    let rotationAxis = createVector(0, 1, 0).cross(dir);
    let rotationAngle = acos(createVector(0, 1, 0).dot(dir));
    rotate(rotationAngle, rotationAxis);

    // draw the arrow shaft
    fill(colour[0], colour[1], colour[2]);
    stroke(colour[0], colour[1], colour[2])
    strokeWeight(3);
    line(0, 0, 0, 0, len, 0);

    // draw the arrowhead
    translate(0, len, 0);
    noStroke();
    cone(arrowSize, arrowSize * 2);
    pop();
}