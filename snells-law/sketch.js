let ray;
let scene = []

function setup() {
  createCanvas(1080, 720, WEBGL, document.getElementById('sketch'));
  gl = this._renderer.GL;
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);   
  ray = new Ray(createVector(0, 0, 0), createVector(50, 15, 0), 1);
  scene.push(new BoxGeometry(75, 10, 40, createVector(0, 0, 0), 1.5));
  //scene.push(new BoxGeometry(100, 20, 30, createVector(10, -50, 30), 1.5))
  
  // sliders for pos
  sliderX = createSlider(-200, 200, 10);
  sliderX.position(10, 410);
  sliderX.size(80)  
  sliderY = createSlider(-200, 200, 30);
  sliderY.position(10, 430);
  sliderY.size(80)
  sliderZ = createSlider(-200, 200, 0);
  sliderZ.position(10, 450);
  sliderZ.size(80)
  sliderN = createSlider(0, 2, 1, 0.01);
  sliderN.position(10, 470);
  sliderN.size(80)  
}

function draw() {
  background(220);
  
  let x = sliderX.value();
  let y = sliderY.value();
  let z = sliderZ.value();
  let n = sliderN.value();
  
  ray.src.y = -y;
  ray.src.x = x;
  ray.src.z = z;
  scene[0].n = n;
  
  // debugMode()
  orbitControl()
  
  ray.draw(scene)
  
  for (let i = 0; i < scene.length; i++) {
    scene[i].show();
  }
  

  
}