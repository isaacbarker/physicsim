class Charge {

    constructor(charge, pos) {
        this.charge = charge;
        this.pos = pos;
    }

    strength(point) {
        let dist = this.pos.dist(point) * SF;

        let E = k * (this.charge) * (1 / Math.pow(dist, 2));
        let vecE = p5.Vector.sub(point, this.pos)
        vecE.normalize()
        vecE.mult(E);

        return vecE;
    }

    potential(point) {
        let dist = this.pos.dist(point) * SF;

        let V = k * this.charge * (1/ dist);

        return V;
    }

}