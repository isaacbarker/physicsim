class Ray {
  
    constructor(src, dir, n) {
      this.src = src;
      this.dir = dir.normalize();
      this.n = n;
    }
    
    draw(scene) {

      push();
      translate(this.src);
      sphere(1);
      pop();
      
      // check for intersection with geometry to find first plane which is interacted width
      let dist = Infinity;
      let intersection = null;
      let geometry = null;
      let plane = null;
      
      for (let i = 0; i < scene.length; i++) {
        let geo = scene[i];
      
        // check for intersection with each plane 
        for (let j = 0; j < geo.planes.length; j++) {
          let pln = geo.planes[j];
          let p = pln[0]
          let n = pln[1];
  
          // get into format of ax + by + cz = d
          let d = p.dot(n);
  
          // find t*dir to each plane
          let denominator = ((n.x * this.dir.x) + (n.y * this.dir.y) + (n.z * this.dir.z))
  
          if (denominator == 0) {
            continue;
          }
  
          let t = (d - (n.x * this.src.x) - (n.y * this.src.y) - (n.z * this.src.z)) / denominator;
  
          let tDir = p5.Vector.mult(this.dir, t);
  
          // Check if the calculated point lies on the plane
          let x = p5.Vector.add(this.src, tDir);
  
          // Check if point lies in the cube
          if (x.x < -geo.w / 2 || x.x > geo.w / 2) {
            continue;
          }
  
          if (x.y < -geo.h / 2 || x.y > geo.h / 2) {
            continue;
          }      
  
          if (x.z < -geo.d / 2 || x.z > geo.d / 2) {
            continue;
          }
  
          if (Math.abs(n.dot(x) - d) < 1e-6) {
              if (Math.abs(t) < dist) {
                  dist = Math.abs(t);
                  intersection = x;
                  plane = pln;
                  geometry = geo;
              }
          }
        }
      }
      
      if (intersection) {
          // draw ray
          push();
          stroke(255, 255, 0, 255);
          line(this.src.x, this.src.y, this.src.z, intersection.x, intersection.y, intersection.z);
          pop();
          
          // draw normal at point
          push();
          translate(intersection);
          stroke(0, 0, 0);
          line(0, 0, 0, plane[1].x * 10, plane[1].y * 10, plane[1].z * 10);
          pop();  

          // calculate new vector after
          let negativeN = p5.Vector.mult(plane[1], -1)
          let cosi = p5.Vector.dot(negativeN, this.dir);
          let cosr = Math.sqrt(1 - Math.pow((this.n / geometry.n), 2) * (1 - Math.pow(cosi, 2)));
          let nMultL = p5.Vector.mult(this.dir, (this.n / geometry.n));
          let angMultN = p5.Vector.mult(plane[1], ((this.n / geometry.n) * cosi - cosr))
          let ref = p5.Vector.add(nMultL, angMultN);

          let refractedRay = new Ray(intersection, ref, geometry.n);

          refractedRay.draw(scene);

          // draw refracted ray

          /*
          push();
          translate(intersection);
          stroke(255, 0, 255);
          line(0, 0, 0, ref.x * 10, ref.y * 10, ref.z * 10);
          pop();
          */

        }
    }
    
}