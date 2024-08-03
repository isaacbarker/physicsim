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