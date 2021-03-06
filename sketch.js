let QM;

function setup() {
  createCanvas(400, 400);
  background(0);
  stroke(255);
  strokeWeight(0.5);
  noFill();
  QM = new quadMap(0,0,400,400);
  for (let i = 0; i < 30; i++) {
    p = new Particle(randomGaussian(200,100), randomGaussian(200,100));
    QM.addParticle(p);
  }
}

function draw() {
  background(0);
  QM.display();
}

function mouseDragged() {
  p = new Particle(mouseX, mouseY);
  QM.addParticle(p);
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  display() {
    circle(this.x, this.y, 1);
  }
}

class quadMap {
  constructor(x0,y0,x1,y1) {
    this.xm = 0.5*(x0+x1);
    this.ym = 0.5*(y0+y1);
    this.NW = new quadNode(x0,this.ym,this.xm,y1);
    this.NE = new quadNode(this.xm,this.ym,x1,y1);
    this.SE = new quadNode(this.xm,y0,x1,this.ym);
    this.SW = new quadNode(x0,y0,this.xm,this.ym);
    this.x0 = x0; this.y0 = y0;
    this.x1 = x1; this.y1 = y1;
  }

  addParticle(p) {
    if(p.x < this.xm && p.y < this.ym) {
      this.SW.addParticle(p);
    }
    if(p.x > this.xm && p.y < this.ym) {
      this.SE.addParticle(p);
    }
    if(p.x < this.xm && p.y > this.ym) {
      this.NW.addParticle(p);
    }
    if(p.x > this.xm && p.y > this.ym) {
      this.NE.addParticle(p);
    }
  }

  display() {
    this.NW.display();
    this.NE.display();
    this.SW.display();
    this.SE.display();
  }
}

class quadNode{
  constructor(x0,y0,x1,y1) {
    this.xm = 0.5*(x0+x1);
    this.ym = 0.5*(y0+y1);
    this.NW;
    this.NE;
    this.SE;
    this.SW;
    this.x0 = x0; this.y0 = y0;
    this.x1 = x1; this.y1 = y1;
    this.particles = [];
  }

  addParticle(p) {
    if(this.particles.length < 10 && this.NW == null) {
      this.particles.push(p);
    } else {
      if(this.NW==null) {
        this.NW = new quadNode(this.x0,this.ym,this.xm,this.y1);
        this.NE = new quadNode(this.xm,this.ym,this.x1,this.y1);
        this.SE = new quadNode(this.xm,this.y0,this.x1,this.ym);
        this.SW = new quadNode(this.x0,this.y0,this.xm,this.ym);
        let ptemp = this.particles;
        this.particles = [];
        for(let i = 0; i < ptemp.length; i++) {
          this.addParticle(ptemp[i]);
        }
      }
      if(p.x < this.xm && p.y < this.ym) {
        this.SW.addParticle(p);
      }
      if(p.x > this.xm && p.y < this.ym) {
        this.SE.addParticle(p);
      }
      if(p.x < this.xm && p.y > this.ym) {
        this.NW.addParticle(p);
      }
      if(p.x > this.xm && p.y > this.ym) {
        this.NE.addParticle(p);
      }
    }
  }

  display() {
    rect(this.x0,this.y0,this.x1-this.x0,this.y1-this.y0);
    if (this.NW != null){
      this.NW.display();
      this.NE.display();
      this.SE.display();
      this.SW.display();
    }
    if(this.particles.length > 0) {
      for(let i = 0; i < this.particles.length; i++) {
        this.particles[i].display();
      }
    } 
  }
}

