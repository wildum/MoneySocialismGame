app.view.addEventListener('contextmenu', (e) => { e.preventDefault(); });

app.stage.hitArea = new PIXI.Rectangle(0, 0, app.screen.width, app.screen.height);
app.stage.interactive = true;


app.stage.mousedown = function (e) {
    var p = e.data.getLocalPosition(this);
    var node;
    for (var n of graph.nodes) {
        if (Vector.squareDist(n, p) <= NODE_RADIUS * NODE_RADIUS) {
            node = n;
        }
    }
    if (node) {
        node.splitMoneyWithNeighbors();
    }
};

app.stage.mousemove = function (e) {
    var p = e.data.getLocalPosition(this);
    for (var n of graph.nodes) {
        if (Vector.squareDist(n, p) <= NODE_RADIUS * NODE_RADIUS) {
            n.graphics.scale.x = 1.25;
            n.graphics.scale.y = 1.25;
        } else {
            n.graphics.scale.x = 1;
            n.graphics.scale.y = 1;
        }
    }

};