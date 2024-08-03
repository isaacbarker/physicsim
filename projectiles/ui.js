// process simulation changes
document.getElementById('ctrls-runsim-btn').addEventListener('click', () => {

    // set masses
    let tempMass = document.getElementById('mass').value;

    if (tempMass == "") {
        tempMass = 1;
    }

    mass = parseFloat(tempMass);

    // set velocities
    let tempVelX = document.getElementById('velx').value;
    let tempVelY = document.getElementById('vely').value;
    let tempVelZ = document.getElementById('velz').value;

    if (tempVelX == '') {
        tempVelX = 0;
    }

    if (tempVelY == '') {
        tempVelY = 20;
    }

    if (tempVelZ == '') {
        tempVelZ = 0;
    }


    vel = [parseFloat(tempVelX), -parseFloat(tempVelY), parseFloat(tempVelZ)];

    // set positions
    let tempPosX = document.getElementById('posx').value;
    let tempPosY = document.getElementById('posy').value;
    let tempPosZ = document.getElementById('posz').value;

    if (tempPosX == '') {
        tempPosX = 0;
    }

    if (tempPosY == '') {
        tempPosY = 10;
    }

    if (tempPosZ == '') {
        tempPosZ = 0;
    }

    pos = [parseFloat(tempPosX), -parseFloat(tempPosY), parseFloat(tempPosZ)];

    // set e
    let tempE = document.getElementById('e').value;

    e = parseFloat(tempE);

    // set sim size
    let tempSize = document.getElementById('size').value

    if (tempSize == '') {
        tempSize = 120;
    }

    size = parseFloat(tempSize);

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
    e = parseFloat(eVal);
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