

import * as d3 from "d3";
import $ from "jquery";
import {getDataById, getId} from "./util/tree";
import {invert} from "./util/color";
import {getTextRows} from "./util/text";
import {data} from "../../data/data";
import Nodes from "./components/Nodes";
import Chart from "./components/Chart";
import Links from "./components/Links";
import { getNodesViewport } from "./util/viewport";


const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

let svg: any,
    nodeWidth = 200, //200,
    nodeHeight = 120, //90,
    nodePadding = 10,
    groupPadding = 10,
    groupColor = '#e18585';
const nodePortSize = 8;
const resizersSide = 16;
let currentScale = 1;
let xScale: any, yScale: any, zoom: any;

let imageSize = 0; //nodeHeight - 2 * nodePadding
// radius of option menus
const dotRadius = 3;
let createdNodes = {createdId: 0, allCreated: {}},
    createdGroups = {createdId: 0, allCreated: {}},
    createdRelLinks = {createdId: 0, allCreated: {}},
    createdChildLinks = {createdId: 0, allCreated: {}},
    deletedObjects = {deletedId: 0, allDeleted: {}},
    addedNodesToGroup = {addedId: 0, allAdded: {}},
    removedNodesFromGroup = {removedId: 0, allRemoved: {}};
let dataNodes: any = [];
let dataGroups: any = [];

function getNodeById(id: any, dataset: any = null) {
    return getDataById(id, dataset || dataNodes);
}

function _addEventsToGroups(groups: any) {
    if (!groups || groups.empty())
        return groups;

    return groups;
}

class FamilyObject {
    nodes : any;

    init() {
        this.nodes = new Nodes();
        Chart.init();
    }


    load(data: any) {
        const tree = (data && data.tree && data.tree.length) ? data.tree : [];
        const groups = (data && data.groups && data.groups.length) ? data.groups : [];
        this.reset();
        this.loadTree(tree);
        //this.loadGroups(groups);
        this.draw();
        Chart.centerAll();
    }


    loadTree(tree: any = null) {
        Nodes.load(tree);
        Links.load(tree);
    }

    reset() {
        this.clearAllActions();
        this.loadTree();
        this.loadGroups();
        this.draw();
    }

    clearAllActions() {
        //HistoryManager.reset();
        createdNodes = {createdId: 0, allCreated: {}};
        createdGroups = {createdId: 0, allCreated: {}};
        createdRelLinks = {createdId: 0, allCreated: {}};
        createdChildLinks = {createdId: 0, allCreated: {}};
        deletedObjects = {deletedId: 0, allDeleted: {}};
        addedNodesToGroup = {addedId: 0, allAdded: {}};
        removedNodesFromGroup = {removedId: 0, allRemoved: {}};
    }

    draw() {

        if (!Chart.svg || Chart.svg.empty()){
            return;
        }

        this.drawGroups();
        //this.drawNodes();
        Nodes.draw();
        //this.drawLinks();
        Links.draw();
    }



   

    _setVisibleText(label: any, id: any, className: any) { // one row and tagName text
        let visibleLabel = label;
        let width = nodeWidth - (3 * nodePadding + imageSize);
        let d3Text;

        if (!svg || svg.empty())
            return visibleLabel;

        d3Text = svg
            .append('text')
            .attr('id', 'pre-compute-' + id)
            .attr('class', className)
            .text(visibleLabel);

        while (d3Text.node().getComputedTextLength() >= width) {
            visibleLabel = label.substring(0, visibleLabel.length - 1);
            d3Text.text(visibleLabel + '...');
        }

        if (visibleLabel != label) {
            visibleLabel += '...';
        }
        d3.selectAll('#pre-compute-' + id).remove();
        return visibleLabel;
    }

    loadGroups(dataset: any = null) {
        dataset = dataset || [];
        const dataGroups: any = [];
        const groupsList: any = [];
        dataset.forEach(function (g: any) {
            g.isGroup = true;
            g.lastX = g.x;
            g.lastY = g.y;
            g.updateId = 0;
            g.allUpdated = {
                '0': {
                    color: g.color,
                    textSize: g.textSize,
                    width: g.width,
                    height: g.height,
                    text: g.text
                }
            };
            dataGroups.push(g);
            groupsList.push({id: g.id, text: g.text});
        });

        groupsList.sort(function (a: any, b: any) {
            var tA = a.text.toUpperCase(); // ignore upper and loadd-to-new-groupwercase
            var tB = b.text.toUpperCase(); // ignore upper and lowercase
            if (tA < tB) return -1;
            if (tA > tB) return 1;
            // texts must be equal
            return 0;
        });

        // CtxMenuManager.updateAddToGroupsItem(dataGroups.map(function(g){
        //         return {id: g.id, text: g.text};
        //     }), function(groupId){
        //         var group = getGroupById(groupId),
        //             nodesToAdd = dataNodes.filter(function(n){return n.selected == true && group.nodes.indexOf(n.id) == -1;});
        //         addNodesTo(nodesToAdd, group);
        //     }
        // );
    }

    drawGroups() {
        if (!svg || svg.empty())
            return;

        const groups = svg.select('.groups').selectAll('.group')
            .data(dataGroups, function (g: any) {
                return g.id
            });

        groups.exit().remove();
        if (groups.nodes.length < 1) {
            return;
        }

        this._createD3Groups(groups.enter(), _addEventsToGroups);
        this._updateD3Groups(groups);
    }

    _renderGroup(d3selection: any, g: any, xs: any = null, ys: any = null, scale: any = 1) {
        if (!d3selection || d3selection.empty() || !g)
            return;

        xs = xs || xScale;
        ys = ys || yScale;
        scale = scale || currentScale;

        var arrowHeadSide = 20,
            color = g.color || groupColor;

        // rectangle which groups nodes
        var nodes: any = [];
        g.nodes.forEach((nId: any) => {
            var node = getNodeById(nId);
            if (node) nodes.push(node);
        });

        var x0, x1, y0, y1;
        var canvasInfo = getNodesViewport(nodes);
        if (!canvasInfo) {
            x0 = xs(g.x);
            x1 = xs(g.x);
            y0 = ys(g.y);
            y1 = ys(g.y);
        } else {
            x0 = xs(canvasInfo.xRange[0] - groupPadding);
            x1 = xs(canvasInfo.xRange[1] + groupPadding);
            y0 = ys(canvasInfo.yRange[0] - groupPadding);
            y1 = ys(canvasInfo.yRange[1] + groupPadding);
        }

        d3selection.select('.group-area').classed('hide', !g.nodes || !g.nodes.length)
            .attr('points', x0 + ',' + y0 + ' ' + x1 + ',' + y0 + ' ' + x1 + ',' + y1 + ' ' + x0 + ',' + y1 + ' ' + x0 + ',' + y0)
            .style('stroke', color);

        // text area which contains comment
        var rectTextArea = d3selection.select('rect.textarea');
        var textArea = d3selection.select('.group-textarea g.textarea');

        var bx = (x0 + x1) * 0.5,
            by = (y0 + y1) * 0.5,
            vx0 = xs(g.x),
            vy0 = ys(g.y + g.height * 0.5),
            vx1 = xs(g.x + g.width * 0.5),
            vy1 = ys(g.y + g.height),
            vx2 = xs(g.x + g.width),
            vy2 = ys(g.y + g.height * 0.5),
            vx3 = xs(g.x + g.width * 0.5),
            vy3 = ys(g.y),
            vertex_gArea = [
                [x0, by], [bx, y1], [x1, by], [bx, y0]
            ],
            vertex_tArea = [
                [vx0, vy0], [vx1, vy1], [vx2, vy2], [vx3, vy3]
            ];

        var minDist = Number.MAX_SAFE_INTEGER;
        let pointerVertex: any = null;
        vertex_gArea.forEach(function (vg) {
            vertex_tArea.forEach(function (vt) {
                var dist = (vg[0] - vt[0]) * (vg[0] - vt[0]) + (vg[1] - vt[1]) * (vg[1] - vt[1]);
                if (dist < minDist) {
                    minDist = dist;
                    pointerVertex = {tArea: vt, gArea: vg};
                }
            });
        });

        d3selection.select('line.pointer').classed('hide', !g.nodes || !g.nodes.length);

        if (pointerVertex) {
            d3selection.select('line.pointer')
                .attr('x1', pointerVertex.tArea[0])
                .attr('y1', pointerVertex.tArea[1])
                .attr('x2', pointerVertex.gArea[0])
                .attr('y2', pointerVertex.gArea[1])
                .style('stroke', color);
        }

        var p = [vx0, vy3],
            w = xs(g.width) - xs(0),
            h = ys(g.height) - ys(0);

        textArea
            .attr('transform', 'translate(' + groupPadding * scale + ',' + groupPadding * scale + ')')
            .selectAll('text')
            .style('font-size', g.textSize * scale + 'px')
            .attr('y', function (d: any, i: number) {
                var textSize = g.textSize || 14,
                    lineSpacer = 2 * textSize / 14;
                return (textSize * (i + 1) + lineSpacer * i) * scale;
            });

        d3selection.select('.background')
            .style('stroke-width', 4)
            .attr({width: w + 4, height: h + 4});

        rectTextArea.attr({'width': w, 'height': h})
            .style('fill', color)
            .style('stroke', color);

        var resizer = d3selection.select('.resizer.bottom-right');
        if (resizer.empty())
            return;
        resizer.attr('x', w - resizersSide * scale)
            .attr('y', h - resizersSide * scale)
            .attr('width', resizersSide * scale)
            .attr('height', resizersSide * scale)
            .attr('fill', invert(color));

        var openGroupCtxMenuDots = d3selection.select('.open-context-menu');
        if (!openGroupCtxMenuDots.empty())
            openGroupCtxMenuDots.attr('transform', 'translate(' + (w - 2 * dotRadius) + ', 0) scale(' + currentScale + ')');

        d3selection.select('.group-textarea').attr('transform', 'translate(' + p[0] + ',' + p[1] + ')');
    }

    _createD3Groups(groupsToAdd: any, addEventsCallback: any) {
        var groups = groupsToAdd.append('g').attr('class', 'group')
            .attr('id', function (d: any) {
                return 'group-' + d.id;
            });

        groups.append('polyline').attr('class', 'group-area');
        groups.append('line').attr('class', 'pointer');

        var textarea = groups.append('g').attr('class', 'group-textarea');

        textarea.append('rect').attr('class', 'background')
            .attr({x: -2, y: -2});

        textarea.append('rect').attr('class', 'textarea');
        textarea.append('g').attr('class', 'textarea');

        groups.each((group: any) => {
            this._updateD3GroupText(d3.select(group))
        });

        var resizers = textarea.append('g').attr('class', 'resizers');
        resizers.append('rect').attr('class', 'resizer bottom-right');

        if (isTouchDevice) {
            var openGroupCtxMenuDots = textarea.append('g')
                .attr('class', 'open-context-menu');
            openGroupCtxMenuDots.append('rect').attr({
                x: -2 * dotRadius,
                width: 4 * dotRadius,
                height: 10 * dotRadius
            });
            openGroupCtxMenuDots.append('circle').attr({
                cy: 2 * dotRadius,
                r: dotRadius
            });
            openGroupCtxMenuDots.append('circle').attr({
                cy: 5 * dotRadius,
                r: dotRadius
            });
            openGroupCtxMenuDots.append('circle').attr({
                cy: 8 * dotRadius,
                r: dotRadius
            });
        }

        if (addEventsCallback)
            groups = addEventsCallback(groups);

        return groups;
    }

    _updateD3Groups(groups: any) {
        if (!groups || groups.empty())
            return;

        groups.classed('selected', function (d: any) {
            return d.selected;
        });

        groups.each((g: any) => {
            //this._renderGroup(d3.select(this), g);
        });
    }

    _updateD3GroupText(d3group: any) {
        if (!d3group || d3group.empty())
            return;

        var data = d3group.datum();
        if (!data)
            return;

        var text = data.text;

        data.hasPartialText = false;

        var textareaDom = d3group.select('g.textarea').node();
        while (textareaDom.lastChild)
            textareaDom.removeChild(textareaDom.lastChild);

        // remove all children of group's textarea element
        var d3textarea = d3.select(textareaDom);
        d3textarea.empty();

        var textSize = data.textSize,
            textFont = 'font-family: Verdana, sans-serif;',
            areaW = data.width - 4 * groupPadding,
            areaH = data.height - 3 * groupPadding,
            rowSpace = 2 * textSize / 14;

        var rows = getTextRows(text, areaW, null, textFont, textSize, '');
        rows.forEach(function (row: any, i: number) {
            d3textarea.append('text')
                .attr('text-rendering', 'geometricPrecision')
                .attr('y', textSize * (i + 1) + rowSpace * i)
                .text(row);
        });

        textareaDom = d3textarea.node();
        var box = textareaDom.getBBox(),
            boxH = box.height,
            boxW = box.width;

        if ((boxH <= areaH && boxW <= areaW) || !textareaDom.lastChild)
            return;

        data.hasPartialText = true;

        while (boxH > areaH && textareaDom.lastChild) {
            textareaDom.removeChild(textareaDom.lastChild);
            boxH = textareaDom.getBBox().height;
        }

        if (!textareaDom.lastChild) {
            d3textarea.append('text').attr('text-rendering', 'geometricPrecision').attr('y', textSize).text('...');
        } else {
            d3textarea.selectAll('text').each(function (tDom:any) {
                // const tDom: any = this;
                var t = tDom.innerHTML;
                while (tDom.getBBox().width > areaW && t.length) {
                    t = t.substr(0, t.length - 1);
                    tDom.innerHTML = t + '...';
                }
            });
        }
    }


    loadNodes(dataset: any = null) {
        dataNodes = dataset || [];
        dataNodes.forEach((node: any) => {
            node.isNode = true;
            node.lastX = node.x;
            node.lastY = node.y;
            node.visible = {
                name: this._setVisibleText(node.name, node.id, 'name'),
                surname: this._setVisibleText(node.surname, node.id, 'surname')
            };
            node.updateId = 0;
            node.allUpdated = {
                '0': {
                    name: node.name,
                    surname: node.surname,
                    description: node.description,
                    sex: node.sex
                }
            };
            console.log(`====== load node`, {dataNodes})
        });
        return dataNodes;
    }


}


$(document).ready(function () {
    const family = new FamilyObject();
    family.init();
    family.load(data);
    document.body.onresize = Chart.onResize;

});