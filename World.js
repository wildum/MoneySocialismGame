var NODE_RADIUS = 15;
var LINK_WIDTH = 2;
var nextNodeId = 0;

class Node {
    constructor(x, y, value) {
        this.id = nextNodeId++;
        this.radius = NODE_RADIUS;
        this.value = value;
        this.neighbors = [];
        this.linkTo = {};
        this.graphics = getNodeGraphics(this.radius, value.toString() || this.id.toString());
        this.graphicText = this.graphics.children[1];
        this.graphics.x = x;
        this.graphics.y = y;
    }

    splitMoneyWithNeighbors() {
        this.value -= this.neighbors.length;
        this.graphicText.text = this.value.toString();
        for (var n of this.neighbors) {
            transactions.push(new Transaction(this, n));
        }
    }

    set x(v) { this.graphics.x = v; }
    get x() { return this.graphics.x; }
    set y(v) { this.graphics.y = v; }
    get y() { return this.graphics.y; }
}

function getNodeGraphics(r, text) {
    var container = new PIXI.Container();
    var s = new PIXI.Sprite(discTexture);
    s.scale.set((2 * r) / discTexture.width);
    s.anchor.set(0.5);
    s.tint = 0x0;
    container.addChild(s);
    if (text !== '') {
        var label = new PIXI.Text(text, { fontFamily: 'Arial', fontSize: 12, fill: 0xFFFFFF, align: 'center' });
        label.anchor.x = label.anchor.y = 0.5;
        container.addChild(label);
    }
    nodeLayer.addChild(container);
    return container;
}

function getLinkGraphics(x1, y1, x2, y2) {
    var g = new PIXI.Graphics();
    var c = new PIXI.Container();

    g.lineStyle(2, 0x0);
    g.moveTo(x1, y1);
    g.lineTo(x2, y2);

    var label = new PIXI.Text('', { fontFamily: 'Arial', fontSize: 12, fill: 0xFFFFFF, align: 'center' });
    label.anchor.x = label.anchor.y = 0.5;
    label.x = (x1 + x2) / 2;
    label.y = (y1 + y2) / 2;

    c.label = label;

    c.addChild(g);
    c.addChild(label);
    linkLayer.addChild(c);

    return c;
}

function lerp(a, b, u) {
    if (a <= b) {
        return a + (b - a) * u;
    } else {
        return b + (a - b) * (1 - u);
    }
}

class Link {
    constructor(nodeA, nodeB) {
        this.nodeA = nodeA;
        this.nodeB = nodeB;
        this.graphics = getLinkGraphics(nodeA.x, nodeA.y, nodeB.x, nodeB.y);
        this.label = this.graphics.label;
    }

    getOther(node) {
        if (node === this.nodeA)
            return this.nodeB;
        if (node === this.nodeB)
            return this.nodeA;

        throw "Exception: The given node isn't attached to this link";
    }
}

class World {
    constructor(level) {
        this.nodes = [];
        this.links = [];
        this.currentLevel = level;
        var nodes = this.nodes;
        var mapNodes;
        var mapLinks;

        

        if (this.currentLevel > 3) {
            this.currentLevel = 1;
        }

        if (this.currentLevel == 1) {
            mapNodes = map1.nodes;
            mapLinks = map1.links;
        } else if (this.currentLevel == 2) {
            mapNodes = map2.nodes;
            mapLinks = map2.links;
        } else if (this.currentLevel == 3) {
            mapNodes = map3.nodes;
            mapLinks = map3.links;
        }

        for (var n of mapNodes) {
            nodes.push(new Node(n.x, n.y, n.value));
        }

        for (var l of mapLinks) {
            this.linkNode(nodes[l.a], nodes[l.b]);
        }

    }

    linkNode(nodeA, nodeB) {
        var link = new Link(nodeA, nodeB);
        nodeA.neighbors.push(nodeB);
        nodeB.neighbors.push(nodeA);
        nodeB.linkTo[nodeA.id] = nodeA.linkTo[nodeB.id] = link;
        this.links.push(link);
    }

    toString() {
        var nodes = this.nodes.filter(n => n !== end).map(n => ({ x: n.x, y: n.y }));
        nodes.push({ x: end.x, y: end.y });
        return JSON.stringify({
            nodes: nodes,
            links: this.links.map(l => ({ a: this.nodes.indexOf(l.nodeA), b: this.nodes.indexOf(l.nodeB) })).filter(v => v.a != -1 && v.b != -1)
        });
    }
}
