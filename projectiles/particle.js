class Particle {
  
    constructor(mass, position, u, a) {
      
      this.mass = mass;
      this.pos = position;
      this.vel = u;
      this.a = a;
      this.r = Math.sqrt(mass) * 4;
      
      // define particle colour
      this.colourR = Math.floor(Math.random() * (230 - 200 + 1)) + 200;
      this.colourG = Math.floor(Math.random() * (200 - 100 + 1)) + 100;
      this.colourB = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
      
    }
    
    update() {
      
      // compute new position
      let uT = p5.Vector.mult(this.vel, DT)
      let aTSquared = p5.Vector.mult(this.a, 0.5 * Math.pow(DT, 2))
      let S = p5.Vector.add(uT, aTSquared);
      this.pos.add(S);
      
      // compute new velocity
      let Adt = p5.Vector.mult(this.a, DT)
      this.vel.add(Adt);
    
      if (this.pos.y + this.r > 0) {
  
        // calculate velocity when this.pos.y == 0
        let velAt0 = Math.sqrt(
          Math.pow(this.vel.y, 2) - 2 * this.a.y * (this.pos.y + this.r)
        )
        
        // prevent ball from going through ground
        this.pos.y = -this.r;
        this.vel.y = -(velAt0) * e;
        
      } 
    }
      
    show() {
      
      // draw sphere
      push();
      translate(this.pos);
      fill(this.colourR, this.colourG, this.colourB);
      sphere(this.r, 128, 128);
      pop();
      
      // draw velocity arrow
      push();
      translate(this.pos);
      stroke(200, 200, 0);
      strokeWeight(1.5)
      line(0, 0, 0, this.vel.x, this.vel.y, this.vel.z)
      pop();
      
      push();
      translate(p5.Vector.add(this.pos, this.vel));
      // rotate cone to be in line with the velocity line
      let n = p5.Vector.normalize(this.vel);
      
      let xAxis = createVector(1, 0, 0);
      let zAxis = createVector(0, 0, -1);
      let rotationAxisZ = zAxis.cross(n);
      let angleZ = acos(zAxis.dot(n));
  
      // apply the rotation
      if (rotationAxisZ.mag() > 0) {
        rotate(angleZ, rotationAxisZ);
        rotate(-PI/2, xAxis)
      }
      
      fill(200, 200, 0)
      cone(2, 4, 128, 1, true);
      
    }
    
  }