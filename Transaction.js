var TRANSACTION_SPEED = 1.5;
var TRANSACTION_RADIUS = 5;
var TRANSACTION_COLOR = 0xFEFE00;

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
    var coin = new PIXI.Sprite(discTexture);
    coin.scale.set((TRANSACTION_RADIUS*2)/coin.width);
    coin.tint = TRANSACTION_COLOR;
    coin.anchor.set(0.5);
    transactionsLayer.addChild(coin);
    return coin;
}