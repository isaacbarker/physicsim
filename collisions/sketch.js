let particleA;
let particleB;

// initialize data for simulation
let massA = Math.floor(Math.random() * 5) + 1;
let massB = Math.floor(Math.random() * 5) + 1;
let velA = [Math.random() * (2 - 0.5) + 0.5, Math.random() * (2 - 0.5) + 0.5, Math.random() * (2 - 0.5) + 0.5];
let velB = [Math.random() * (2 - 0.5) + 0.5, Math.random() * (2 - 0.5) + 0.5, Math.random() * (2 - 0.5) + 0.5];
let posA = [-100, 0, 0];
let posB = [100, 0, 0];
let size = 2 * 60;
let e = 1;

let paused = false;

function setup() {
    createCanvas(window.innerWidth / 2, 760, WEBGL, document.getElementById('sketch'));
    particleA = new Particle(massA, posA[0], posA[1], posA[2], velA[0], velA[1], velA[2]);
    particleB = new Particle(massB, posB[0], posB[1], posB[2], velB[0], velB[1], velB[2]);
    }

function draw() {

    ambientLight(200);

    background(0);
    orbitControl();
    perspective(0.2, (width / height), 10, 500000)

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
    document.getElementById('Av').innerHTML = `V<sub>1</sub> = ${particleA.velocity.mag().toFixed(2)} m/s`;
    document.getElementById('Bv').innerHTML = `V<sub>2</sub> = ${particleB.velocity.mag().toFixed(2)} m/s`;
    document.getElementById('Am').innerHTML = `mass of A = ${particleA.mass.toFixed(2)} kg`;
    document.getElementById('Bm').innerHTML = `mass of B = ${particleB.mass.toFixed(2)} kg`;

}

// process simulation changes
document.getElementById('ctrls-runsim-btn').addEventListener('click', () => {

    // set masses
    let tempMassA = document.getElementById('massA').value;

    if (tempMassA == "") {
        tempMassA = Math.floor(Math.random() * 5) + 1;
    }

    massA = parseFloat(tempMassA);

    let tempMassB = document.getElementById('massB').value;

    if (tempMassB == "") {
        tempMassB = Math.floor(Math.random() * 5) + 1;
    }

    massB = parseFloat(tempMassB);

    // set velocities
    let tempVelAX = document.getElementById('velAx').value;
    let tempVelAY = document.getElementById('velAy').value;
    let tempVelAZ = document.getElementById('velAz').value;

    if (tempVelAX == '') {
        tempVelAX = Math.random() * (2 - 0.5) + 0.5
    }

    if (tempVelAY == '') {
        tempVelAY = Math.random() * (2 - 0.5) + 0.5
    }

    if (tempVelAZ == '') {
        tempVelAZ = Math.random() * (2 - 0.5) + 0.5
    }

    velA = [parseFloat(tempVelAX), parseFloat(tempVelAY), parseFloat(tempVelAZ)];

    let tempVelBX = document.getElementById('velBx').value;
    let tempVelBY = document.getElementById('velBy').value;
    let tempVelBZ = document.getElementById('velBz').value;

    if (tempVelBX == '') {
        tempVelBX = Math.random() * (2 - 0.5) + 0.5
    }

    if (tempVelBY == '') {
        tempVelBY = Math.random() * (2 - 0.5) + 0.5
    }

    if (tempVelBZ == '') {
        tempVelBZ = Math.random() * (2 - 0.5) + 0.5
    }

    velB = [parseFloat(tempVelBX), parseFloat(tempVelBY), parseFloat(tempVelBZ)];

    // set positions
    let tempPosAX = document.getElementById('posAx').value;
    let tempPosAY = document.getElementById('posAy').value;
    let tempPosAZ = document.getElementById('posAz').value;

    if (tempPosAX == '') {
        tempPosAX = -100 / 60;
    }

    if (tempPosAY == '') {
        tempPosAY = 0;
    }

    if (tempPosAZ == '') {
        tempPosAZ = 0;
    }

    posA = [parseFloat(tempPosAX) * 60, parseFloat(tempPosAY) * 60, parseFloat(tempPosAZ) * 60];

    let tempPosBX = document.getElementById('posBx').value;
    let tempPosBY = document.getElementById('posBy').value;
    let tempPosBZ = document.getElementById('posBz').value;

    if (tempPosBX == '') {
        tempPosBX = 100 / 60;
    }

    if (tempPosBY == '') {
        tempPosBY = 0;
    }

    if (tempPosBZ == '') {
        tempPosBZ = 0;
    }

    posB = [parseFloat(tempPosBX) * 60, parseFloat(tempPosBY) * 60, parseFloat(tempPosBZ) * 60];

    // set e
    let tempE = document.getElementById('e').value;

    e = parseFloat(tempE);

    // set sim size
    let tempSize = document.getElementById('size').value

    if (tempSize == '') {
        tempSize = 2;
    }

    size = parseFloat(tempSize) * 60;

    setup()
    paused = false;
    document.getElementById('collt').innerHTML = '';

})

// pause / play simulation
document.getElementById('ctrls-pause-play-btn').addEventListener('click', () => {
    paused = !paused;
})

// update e interface
document.getElementById('e').addEventListener('change', () => {
    let eVal = document.getElementById('e').value;
    document.getElementById('e-label').innerHTML = `Coeffecient of Resitution (e=${eVal})`;
})

// download data
document.getElementById('download-momentum').addEventListener('click', () => {
    let data = particleA.collisions;
    let headers = 'p1x, p2x, p1y, p2y, p1z, p2z, p1x\', p2x\', p1y\', p2y\', p1z\', p2z\'\n'
    let strData = data.map(row => row.join(",")).join("\n");
    let csvData = headers.concat(strData);
    let blob = new Blob([csvData], { type: 'text/csv' });
    let url = window.URL.createObjectURL(blob);

    let a = document.createElement('a')
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'data.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
})

document.getElementById('download-velocity').addEventListener('click', () => {
    let data = particleA.collisions;

    let headers = 'v1x, v2x, v1y, v2y, v1z, v2z, v1x\', v2x\', v1y\', v2y\', v1z\', v2z\n'

    // divide by mass of each particle
    let strData = data.map(row => { 

        for (let i = 0; i < row.length; i++) {
            if (i % 2 == 0) {
                row[i] = row[i] / massA;
            } else {
                row[i] = row[i] / massB;
            }
        }

        return row.join(",")
    }).join("\n");
    let csvData = headers.concat(strData);
    let blob = new Blob([csvData], { type: 'text/csv' });
    let url = window.URL.createObjectURL(blob);

    let a = document.createElement('a')
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'data.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
})

