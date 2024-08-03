class Particle {
  
    constructor(mass, x, y, z, velx, vely, velz) {
      this.position = createVector(x, y, z);
      this.velocity = createVector(velx, vely, velz);
      this.acceleration = createVector(0, 0, 0);
      this.mass = mass;
      this.r = sqrt(this.mass) * 20;  
      this.colR = random(100, 200);
      this.colG = random(100, 200);
      this.colB = random(100, 200);
      this.collisions = [];
    }
    
    collide(p, e) {
      // check if collision is to occur
      if (p5.Vector.dist(this.position, p.position) <= (this.r + p.r)) {
        // collision will occur
        let m1 = this.mass;
        let m2 = p.mass

        let v1 = this.velocity;
        let v2 = p.velocity;

        // delcare vectors normal and tangental to line of collision
        let n = p5.Vector.sub(p.position, this.position).normalize();

        // resolve velocities in n
        let v1n = p5.Vector.dot(v1, n);
        let v2n = p5.Vector.dot(v2, n);

        let v1nv = p5.Vector.mult(n, v1n);
        let v2nv = p5.Vector.mult(n, v2n);

        // subtract original normal velocities
        let v1p = p5.Vector.sub(v1, v1nv);
        let v2p = p5.Vector.sub(v2, v2nv);

        // computer velocities after
        let v1np = (m1*v1n - m2*e*v1n + m2*v2n + m2*e*v2n) / (m1 + m2);
        let v2np = (m2*v2n - m1*e*v2n + m1*v1n + m1*e*v1n) / (m1 + m2);

        // add new normal velocities
        let v1npv = p5.Vector.mult(n, v1np);
        let v2npv = p5.Vector.mult(n, v2np);

        v1p.add(v1npv);
        v2p.add(v2npv);

        this.velocity = v1p;
        p.velocity = v2p;

        // log collision
        let list = document.getElementById('table-data')
        let tr = document.createElement('tr');
        let data = [v1.x * m1, v2.x * m2, v1.y * m1, v2.y * m2, v1.z * m1, v2.z * m2, v1p.x * m1, v2p.x * m2, v1p.y * m1, v2p.y * m2, v1p.z * m1, v2p.z * m2]

        // add collision to each particle history
        this.collisions.push(data);
        p.collisions.push(data)

        // add collision in table
        data.forEach((d) => {
            let td = document.createElement('td')
            td.innerHTML = d.toFixed(2);
            tr.appendChild(td)
        })
    
        list.appendChild(tr);
      } 
    }
    
    update() {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
    }
    
    edges(size) {

      if (this.position.x > size - this.r) {
        this.position.x = size - this.r;
        this.velocity.x *= -1;
      } else if (this.position.x < -size + this.r) {
        this.position.x = -size + this.r;
        this.velocity.x *= -1;
      }

      if (this.position.y > size - this.r) {
        this.position.y = size - this.r;
        this.velocity.y *= -1;
      } else if (this.position.y < -size + this.r) {
        this.position.y = -size + this.r;
        this.velocity.y *= -1;
      }

      if (this.position.z > size - this.r) {
        this.position.z = size - this.r;
        this.velocity.z *= -1;
      } else if (this.position.z < -size + this.r) {
        this.position.z = -size + this.r;
        this.velocity.z *= -1;
      }
    }
    
    show() {
      push();
      strokeWeight(.5)
      fill(this.colR, this.colG, this.colB);
      translate(this.position.x, this.position.y, this.position.z)
      sphere(this.r, 128, 128);
      pop();
    }
    
  }