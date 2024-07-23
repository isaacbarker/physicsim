class Ray {
  
    constructor(src, dir, n, isSource) {
      this.src = src;
      this.dir = dir.normalize();
      this.n = n;
      this.isSource = isSource;
    }
    
    draw(scene) {

      if (this.isSource) {
        push();
        translate(this.src);
        fill(255, 255, 0)
        sphere(1, 128, 128);
        pop();
      }
      
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

          let p = pln[0];
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
          if (!geo.isInside(x)) {
            continue;
          }
  
          if (Math.abs(n.dot(x) - d) < 1e-6) {
              if (Math.abs(t) < dist && t > 0) {
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
          stroke(255, 255, 255, 240);
          line(plane[1].x * -7.5, plane[1].y * -7.5, plane[1].z * -7.5, plane[1].x * 7.5, plane[1].y * 7.5, plane[1].z * 7.5);
          pop();  

          // calculate new vector after
          let n1 = this.n;
          let n2;
          let n;

          // check if ray is already inside the geometry
          if (geometry.isInside(this.src)) {
            n1 = geometry.n;
            n2 = 1;
            n = p5.Vector.mult(plane[1], -1)
          } else {
            n2 = geometry.n;
            n = plane[1]
          }

          // Check for TIR
          let cosc = Math.sqrt(1 - Math.pow((n2/n1), 2));
          let c = acos(cosc);

          let negativeN = p5.Vector.mult(n, -1);
          let cosi = p5.Vector.dot(negativeN, this.dir);
          let i = acos(cosi);

          let ref;

          if (i > c && (n2 / n1) < 1) {
            // total internal reflection
            let cosN = p5.Vector.mult(n, (2*cosi));
            n2 = n1;
            ref = p5.Vector.add(this.dir, cosN);
          } else {
            let cosr = Math.sqrt(1 - Math.pow((n1 / n2), 2) * (1 - Math.pow(cosi, 2)));
            let nMultL = p5.Vector.mult(this.dir, (n1 / n2));
            let angMultN = p5.Vector.mult(n, ((n1 / n2) * cosi - cosr))
    
            ref = p5.Vector.add(nMultL, angMultN);
          }

          let newRay = new Ray(intersection, ref, n2, false);

          newRay.draw(scene);

      } else {
        push();
        translate(this.src);
        stroke(255, 255, 0, 255);
        line(0, 0, 0, this.dir.x*50, this.dir.y*50, this.dir.z*50)
        pop();
      }
    }
    
}