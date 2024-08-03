let ray;
let scene = []
let interactions = []

const UNCERTAINTY = 1e-6

function setup() {
  createCanvas(window.innerWidth * 0.7, 760, WEBGL, document.getElementById('sketch'));
  gl = this._renderer.GL;
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);   
  ray = new Ray(createVector(0, 0, 0), createVector(50, 15, 0), 1, true);
  scene.push(new BoxGeometry(75, 15, 40, createVector(0, 0, 0), 1.5));}

function draw() {
  // disable loading screen on first draw
  pageLoaded()

  background(0);
  ambientLight(255);
  perspective(0.2, (width / height), 10, 500000)
  //camera(200, -400, 800);
  //noLoop();
  // debugMode()
  orbitControl()

  // clear data
  document.getElementById('table-data').innerHTML = '';
  interactions = [];
  
  // load values from ui
  let posX = parseFloat(document.getElementById('posX').value);
  let posY = parseFloat(document.getElementById('posY').value);
  let posZ = parseFloat(document.getElementById('posZ').value);

  let dirX = parseFloat(document.getElementById('dirX').value);
  let dirY = parseFloat(document.getElementById('dirY').value);
  let dirZ = parseFloat(document.getElementById('dirZ').value);

  let n = parseFloat(document.getElementById('n').value);

  // prevent point from going into geometry
  let isInGeometry = false;

  for (let i = 0; i < scene.length; i++) {
    if (scene[i].isInside(createVector(posX, -posY, posZ))) {
      isInGeometry = true;
    }
  }
  
  if (!isInGeometry) {
    ray.src.x = posX;
    ray.src.y = -posY;
    ray.src.z = posZ;
  }

  ray.dir.x = dirX;
  ray.dir.y = -dirY;
  ray.dir.z = dirZ;

  ray.dir.normalize();
  
  ray.draw(scene)
  
  for (let i = 0; i < scene.length; i++) {
    scene[i].n = n;
    scene[i].show();
  }

}

document.getElementById('download').addEventListener('click', () => {
  let data = interactions;
  let headers = 'i/rad, c/rad, r/rad, n1, n2\n'
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