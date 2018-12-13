app.view.addEventListener('contextmenu', (e) => { e.preventDefault(); });

app.stage.hitArea = new PIXI.Rectangle(0, 0, app.screen.width, app.screen.height);
app.stage.interactive = true;

showStats();

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
        moveCounter++;
        showStats();
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

function showStats() {
    var c = new PIXI.Container();
    var countMoveLabel = new PIXI.Text('Move counter: ' + moveCounter, { fontFamily: 'Arial', fontSize: 14, fill: 0, align: 'center' });
    countMoveLabel.x = 20;
    countMoveLabel.y = 20;
    var levelLabel = new PIXI.Text('Level: ' + currentLevel, { fontFamily: 'Arial', fontSize: 14, fill: 0, align: 'center' });
    levelLabel.x = 20;
    levelLabel.y = 40;
    
    c.addChild(countMoveLabel);
    c.addChild(levelLabel);

    infoLayer.children.forEach(c=>c.destroy(true));
    infoLayer.removeChildren();
    infoLayer.addChild(c);
    return c;
}

span.onclick = function() {
    modal.style.display = "none";
}
  
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}