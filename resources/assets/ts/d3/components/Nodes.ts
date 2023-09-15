
import Chart from "./Chart";
import Text from "./Text";
import { getDataById, getId } from "../util/tree";
import { getTextRows } from "../util/text";
import $ from "jquery";

import * as d3 from "d3";

/**
 * https://d3-wiki.readthedocs.io/zh_CN/master/Selections/#control
 */
export default class Nodes {
    static items: any

    constructor() {

    }

    static getNodeById(id:string, dataset:any=false){
        let items: any = dataset || Nodes.items;
        items = items.filter((item:any)=>{ return item.id == id});
        if( items.length === 1){
            return items[0];
        }
        return getDataById(id, dataset || Nodes.items);
    }

    static getEndPoint(d:any){
        const {nodeWidth} = Chart;
		let x:any, y:any;
		if (d.childId){
			var child = Nodes.getNodeById(d.childId);
			if (child){
				x = child.x + nodeWidth * 0.5, 
				y = child.y;
			} 
		} else {
			x = d.extraCoords.x;
			y = d.extraCoords.y; 
		}		
		return { 
			x: x, 
			y: y
		};
	};

    static load(dataset: any = null) {
        Nodes.items = dataset || [];

        Nodes.items.forEach((node: any) => {
            node.isNode = true;
            node.lastX = node.x;
            node.lastY = node.y;
            node.visible = {
                name: Text.setVisibleText(node.name, node.id, 'name'),
                surname: Text.setVisibleText(node.surname, node.id, 'surname')
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
        });

        return Nodes.items;
    }

    /**
     * drawNodes
     * @returns 
     */
    static draw() {
        if (!Chart.svg || Chart.svg.empty()) {
            return;
        }


        const nodes: any = Chart.svg.select('.nodes').selectAll('.node').data(Nodes.items, getId)
        nodes.exit().remove();

        Nodes.createD3(nodes.enter(), Nodes.addEvents);
        Nodes.updateD3(nodes);
    }


    static addEvents(nodes: any) {
        if (!nodes || nodes.empty())
            return nodes;

        return nodes;
    }

    static createD3(nodesToAdd: any, addEventsCallback: any) {
        const { nodeWidth, nodeHeight, nodePadding, imageSize, nodePortSize, isTouchDevice, dotRadius } = Chart;

        let newNodes = nodesToAdd.append('g').attr('class', 'node')
            .attr('id', function (d: any) {
                return 'node-' + d.id;
            });
        newNodes.append('rect')
            .attr('class', 'node-base')
            .attr("width", nodeWidth)
            .attr("height", nodeHeight);

        let fontSize = 20,
            fromTop = fontSize + nodePadding;

        newNodes.append('text')
            .attr("class", "name")
            .attr("text-rendering", "geometricPrecision")
            .attr("x", nodeWidth * 0.5) //2 * nodePadding + imageSize
            .attr("y", fromTop);

        fromTop += fontSize + 3;

        newNodes.append('text')
            .attr("class", "surname")
            .attr("text-rendering", "geometricPrecision")
            .attr("x", nodeWidth * 0.5) //2 * nodePadding + imageSize
            .attr("y", fromTop);

        fromTop += 3 * 2;

        newNodes.append('g')
            .attr('class', 'description')
            .attr('transform', 'translate(' + (2 * nodePadding + imageSize) + ',' + fromTop + ')');

        const parentPort = newNodes.append('circle')
            .attr("class", "parent-port")
            .attr("r", nodePortSize)
            .attr("cx", (nodeWidth * 0.5) + 'px')
            ;

        newNodes.append('polygon')
            .attr("class", "partner-port left")
            .attr("points", '0,' + (0.5 * nodeHeight - nodePortSize)
                + ' ' + nodePortSize + ',' + (0.5 * nodeHeight)
                + ' 0,' + (0.5 * nodeHeight + nodePortSize)
                + ' -' + nodePortSize + ',' + (0.5 * nodeHeight));
        newNodes.append('circle')
            .attr("class", "partner-port hidden-port left")
            .attr("cx", 0)
            .attr("cy", 0.5 * nodeHeight)
            .attr("r", 1.5 * nodePortSize)
            ;

        newNodes.append('polygon')
            .attr("class", "partner-port right")
            .attr("points", nodeWidth + ',' + (0.5 * nodeHeight - nodePortSize)
                + ' ' + (nodeWidth + nodePortSize) + ',' + (0.5 * nodeHeight)
                + ' ' + nodeWidth + ',' + (0.5 * nodeHeight + nodePortSize)
                + ' ' + (nodeWidth - nodePortSize) + ',' + (0.5 * nodeHeight))


        newNodes.append('circle')
            .attr("class", "partner-port right hidden-port")
            .attr("cx", nodeWidth)
            .attr("cy", 0.5 * nodeHeight)
            .attr("r", 1.5 * nodePortSize)


        if (isTouchDevice) {
            const openNodeCtxMenuDots = newNodes.append('g')
                .attr("class", "open-context-menu")
                .attr("transform", 'translate(' + (nodeWidth - 2 * dotRadius) + ', 0)');
            openNodeCtxMenuDots.append('rect')
                .attr("x", -2 * dotRadius)
                .attr("width", 4 * dotRadius)
                .attr("height", 10 * dotRadius);
            openNodeCtxMenuDots.append('circle')
                .attr("cy", 2 * dotRadius)
                .attr("r", dotRadius);
            openNodeCtxMenuDots.append('circle')
                .attr("cy", 5 * dotRadius)
                .attr("r", dotRadius);
            openNodeCtxMenuDots.append('circle')
                .attr("cy", 8 * dotRadius)
                .attr("r", dotRadius);

        }

        Nodes.updateD3(newNodes, true);

        if (addEventsCallback)
            newNodes = addEventsCallback(newNodes);
        return newNodes;
    }

    static updateD3(nodes: any, onlyBasicInfo: any = false) {
        if (!nodes || nodes.empty()) {
            //console.warn(`====== nodes.updateD3 [nodes is emtpy]`, { nodes })
            return;
        }
        
        if (onlyBasicInfo === true) { // includes image, texts and sex
            Nodes.updateD3Texts(nodes);
            this.updateD3Colors(nodes);
            this.updateD3Images(nodes);
            return;
        }

        //extraParams is an array of relationship links
        nodes.classed('selected', function (d: any) {
            return d.selected;
        });

        const { currentScale, xScale, yScale } = Chart;

        const xS = xScale(1) - xScale(0);
        const yS = yScale(1) - yScale(0);
        nodes.each((d: any) => {
            const d3selection = d3.select(`#node-${d.id}`);
            const tx = xScale(d.x);
            const ty = yScale(d.y);
            d3selection.attr('transform', 'translate(' + tx + ', ' + ty + ') scale(' + xS + ',' + yS + ')');
            d3selection.selectAll('.node-base, .partner-port, circle').attr('stroke-width', 2 / currentScale);
            // image section
            d3selection.selectAll('.node-image').attr('stroke-width', 1 / currentScale);
        });
    }

    static updateD3Texts(nodes: any) {
        if (!nodes || nodes.empty()) {
            return;
        }

        nodes.each((d: any) => {
            const selection: any = d3.select(d);
            //selection.select('.name').text(d.visible.name);
            d3.select(`#node-${d.id} .name`).text(d.visible.name)
            //selection.select('.surname').text(d.visible.surname);
            d3.select(`#node-${d.id} .surname`).text(d.visible.surname)
            this.setD3Description(selection);
        });
    }

    static updateD3Colors(nodes: any) {
        if (!nodes || nodes.empty()){
            console.warn(`====== updateD3Colors is empty`)
            return;
        }
            
        nodes.classed('male', function (d: any) {
            return d.sex.toUpperCase() == 'M';
        });
        nodes.classed('female', function (d: any) {
            return d.sex.toUpperCase() == 'F';
        });
    };

    static updateD3Images(nodes: any) {
        if (!nodes || nodes.empty())
            return;
        nodes.selectAll('img.node-image').attr('href', function (d: any) {
            return d.image || null;
        });
    }

    static setD3Description(nodeD3: any, jQueryElm: any = null, nodeData: any = null) {
        if (!nodeD3 || nodeD3.empty()){
            return;
        }
            
        const node = nodeD3.node();
        if (!node)
            return;

        const { nodeWidth, nodeHeight, nodePadding, imageSize } = Chart;
        node.hasPartialDescr = false;

        const text = node.description || nodeData.description;
        
        let descrDom: any = $(`#node-${node.id} .description`).get(0);

        while (descrDom.lastChild)
            descrDom.removeChild(descrDom.lastChild);

        // remove all children of description group element
        const d3descr = d3.select(descrDom);
        d3descr.empty();

        let descrFontSize = 14,
            descrFont = '"Helvetica Neue",Helvetica,Arial,sans-serif',
            descrFontWeight = 600,
            fontSize = 20,
            descrW = nodeWidth - (3 * nodePadding + imageSize),
            descrH = nodeHeight - (2 * fontSize + 3 * 3 + 2 * nodePadding);

        const rowSpace = 2;

        const rows = getTextRows(text, descrW, descrFontWeight, descrFont, descrFontSize, '');
        rows.forEach((row: any, i: number) => {
            d3descr.append('text')
                .attr('x', descrW * 0.5)
                .attr('y', descrFontSize * (i + 1) + rowSpace * i)
                .text(row);
        });

        descrDom = d3descr.node();
        var boxH = descrDom.getBBox().height;

        if (descrDom.getBBox().height <= descrH || !descrDom.lastChild)
            return;

        node.hasPartialDescr = true;

        while (boxH > descrH && descrDom.lastChild) {
            descrDom.removeChild(descrDom.lastChild);
            boxH = descrDom.getBBox().height;
        }

        if (!descrDom.lastChild) {
            d3descr.append('text').attr('x', descrW * 0.5).attr('y', descrFontSize).text('...');
        } else {
            var t = descrDom.lastChild.innerHTML;
            descrDom.lastChild.innerHTML = t + '...';
            while (descrDom.lastChild.getBBox().width > descrW && t.length) {
                t = t.substr(0, t.length - 1);
                descrDom.lastChild.innerHTML = t + '...';
            }
        }
    }
}

// export const nodes = Family.Nodes;
