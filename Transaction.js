var TRANSACTION_SPEED = 1;

class Transaction {
    constructor(start, target) {
        this.start = start;
        this.graphics = getTransactionGraphics(this.radius);
        this.x = start.graphics.x;
        this.y = start.graphics.y;
        this.target = target;
    }

    set x(v) { this.graphics.x = v; }
    get x() { return this.graphics.x; }
    set y(v) { this.graphics.y = v; }
    get y() { return this.graphics.y; }

    apply() {
        this.target.value += 1;
        this.target.graphicText.text = this.target.value.toString();
        transactionsLayer.removeChild(this.graphics);
    }

    move() {
        if (!this.target) {
            throw "Exception: /!\\ not supposed to happen (design flaw?)";
        }

        if (Vector.squareDist(this, this.target) <= TRANSACTION_SPEED) {
            this.x = this.target.x;
            this.y = this.target.y;
        } else {
            var vx = this.target.x - this.x;
            var vy = this.target.y - this.y;

            var speed = new Vector(vx, vy).normalize().multiplyScalar(TRANSACTION_SPEED);
            this.x += speed.x;
            this.y += speed.y;
        }
    }

    isAtTarget() {
        return this.x == this.target.graphics.x && this.y == this.target.graphics.y;
    }

}

function getTransactionGraphics() {
    var label = new PIXI.Text("1", { fontFamily: 'Arial', fontSize: 12, fill: 0xFF0000, align: 'center' });
    label.anchor.x = label.anchor.y = 1;
    transactionsLayer.addChild(label);
    return label;
}