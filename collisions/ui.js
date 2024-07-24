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


    velA = [parseFloat(tempVelAX), -parseFloat(tempVelAY), parseFloat(tempVelAZ)];

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

    velB = [parseFloat(tempVelBX), -parseFloat(tempVelBY), parseFloat(tempVelBZ)];

    // set positions
    let tempPosAX = document.getElementById('posAx').value;
    let tempPosAY = document.getElementById('posAy').value;
    let tempPosAZ = document.getElementById('posAz').value;

    if (tempPosAX == '') {
        tempPosAX = -75 / 60;
    }

    if (tempPosAY == '') {
        tempPosAY = 0;
    }

    if (tempPosAZ == '') {
        tempPosAZ = 0;
    }

    posA = [parseFloat(tempPosAX) * 60, -parseFloat(tempPosAY) * 60, parseFloat(tempPosAZ) * 60];

    let tempPosBX = document.getElementById('posBx').value;
    let tempPosBY = document.getElementById('posBy').value;
    let tempPosBZ = document.getElementById('posBz').value;

    if (tempPosBX == '') {
        tempPosBX = 75 / 60;
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
    document.getElementById('table-data').innerHTML = '';

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
    let headers = 'pax, pbx, pay, pby, paz, pbz, pax\', pbx\', pay\', pby\', paz\', pbz\'\n'
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

    let headers = 'vax, vbx, vay, vby, vaz, vbz, vax\', vbx\', vay\', vby\', vaz\', vbz\'\n'

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