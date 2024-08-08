// change reference frame on user interaction
document.getElementById('ref').addEventListener('click', () => {
    rotationalRef = !rotationalRef
    if (rotationalRef == false) {
        cam = createCamera();
        cam.lookAt(c.x, c.y, c.z)
        document.getElementById('ref').innerHTML = 'Rotational Reference'
    } else {
        document.getElementById('ref').innerHTML = 'Intertial Reference'
    }
})

// pause / play simulation
document.getElementById('ctrls-pause-play-btn').addEventListener('click', () => {
    paused = !paused;
})

// change whether the simulation works in angular velocity or tangential velocity
document.getElementById('v-input').addEventListener('mousedown', () => {
    angularPriority = false;
    accelerationPriority = true;
})

document.getElementById('omega-input').addEventListener('mousedown', () => {
    angularPriority = true;
    accelerationPriority = false;
})

// change whether the simulation changes centripetal acceleration or radius
document.getElementById('r-input').addEventListener('mousedown', () => {
    accelerationPriority = false;
    angularPriority = true;
})

document.getElementById('a-input').addEventListener('mousedown', () => {
    accelerationPriority = true;
    angularPriority = false;
})