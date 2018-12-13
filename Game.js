// modal
var span = document.getElementsByClassName("close")[0];
var modal = document.getElementById('myModal');
var popupheader = document.getElementById('popup-header');
var popupbody = document.getElementById('popup-body');

var moveCounter = 0;
var currentLevel = 1;

var app = new PIXI.Application({
    width: 974,
    height: 548,
    transparent: false,
    resolution: 2,
    backgroundColor: 0xfefefe
});

var gameLayer = new PIXI.Container();
var infoLayer = new PIXI.Container();

app.stage.addChild(gameLayer);
app.stage.addChild(infoLayer);

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

popup("Rules", "You win if no one is in debt anymore (no node has a negative value). When you click on a node, it will send 1 unit of money to each of its neighbors.")

function updateTransactions() {
    transactions = transactions.filter(function(t) {
        t.move();
        if (t.isAtTarget()) {
            t.apply();
            return false;
        }
        return true;
    })
    if (transactions.length == 0) {
        if (checkWin()) {
            popup("Victory", "You won using " + moveCounter + " moves.");
            graph = new World();
            nodes = graph.nodes;
            moveCounter = 0;
            showStats();
        }
    }
}

function checkWin() {
    for (var n of nodes) {
        if (n.value < 0) {
            return false;
        }
    }
    return true;
}

function popup(headertext, bodytext) {
    modal.style.display = "block";
    popupbody.innerHTML = bodytext;
    popupheader.innerHTML = headertext;
}

document.getElementById("canvasZone").appendChild(app.view);