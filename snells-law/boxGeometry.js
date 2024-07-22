class BoxGeometry {
  
    constructor(w, h, d, c, n) {
      this.w = w;
      this.h = h;
      this.d = d;
      this.c = c;
      this.n = n;
      
      // normal vectors
      this.normals = [
        createVector(0, 0, -1),
        createVector(0, 0, 1),
        createVector(0, -1, 0),
        createVector(0, 1, 0),
        createVector(-1, 0, 0),
        createVector(1, 0, 0)
        
      ]
      
      // compute planes
      this.planes = [];
      
      for (let i = 0; i < this.normals.length; i++) {
        let n = this.normals[i];
        
        // compute position vector
        let r;
        
        if (i < 2) {
          r = p5.Vector.mult(n, this.d/2);
        } else if (i > 3) {
          r = p5.Vector.mult(n, this.w/2);
        } else {
          r = p5.Vector.mult(n, this.h/2);
        }
        
        let p = p5.Vector.add(this.c, r);
        
        this.planes.push([p, n]);
      }
    }
    
    show() {  
      // draw normals
      for (let i = 0; i < this.planes.length; i++) {
        let p = this.planes[i][0];
        let n = this.planes[i][1];
        
        push();
        translate(p);
        stroke(255, 0, 0, 100)
        line(0, 0, 0, n.x * 10, n.y * 10, n.z * 10);
        pop();
      }
      
      // draw box geometry
      push();
      translate(this.c);
      fill(255, 200, 255, 100)
      box(this.w, this.h, this.d, 4, 4);
      pop();
    }

    isInside(point) {
      if (point.x >= -this.w / 2 && point.y <= this.w / 2
        && point.y >= -this.h / 2 && point.y <= this.h / 2 
        && point.z >= -this.d / 2 && point.z <= this.d / 2 
      ) {
        return true;
      } else {
        return false;
      }
    }
    
  }