var app = new PIXI.Application({
    width: 974,
    height: 548,
    transparent: false,
    resolution: 2,
    backgroundColor: 0xFFFFFF
});

var gameLayer = new PIXI.Container();
var hudLayer = new PIXI.Container();

app.stage.addChild(gameLayer);
app.stage.addChild(hudLayer);

var linkLayer = new PIXI.Container();
var nodeLayer = new PIXI.Container();
var transactionsLayer = new PIXI.Container();

gameLayer.addChild(linkLayer);
gameLayer.addChild(transactionsLayer);
gameLayer.addChild(nodeLayer);

var discTexture;
function initTextures() {
    var g = new PIXI.Graphics();
    g.beginFill(0xFFFFFF);
    g.drawCircle(0, 0, 15);
    g.endFill();
    discTexture = g.generateCanvasTexture();
}
initTextures();

var graph = new World();
var nodes = graph.nodes;
var transactions = []

setInterval(() => { updateTransactions(); }, 0);

function animate() {    
    app.render();
    requestAnimationFrame(animate);
}

function updateTransactions() {
    transactions = transactions.filter(function(t) {
        t.move();
        if (t.isAtTarget()) {
            t.apply();
            return false;
        }
        return true;
    })
}

document.getElementById("canvasZone").appendChild(app.view);