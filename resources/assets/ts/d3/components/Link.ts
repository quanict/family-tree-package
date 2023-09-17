import * as d3 from "d3";
import Chart from "./Chart";
import { getId, drawLine } from "../util/tree";
import Nodes from "./Nodes";


export default class Link {
	static items: Array<any> = []

    static add(id:string , fromNode:any, toNode:any){
        Link.items.push({
            id:id, fromNode:fromNode, toNode:toNode
        })
    }

    static draw() {
		if (!Chart.svg || Chart.svg.empty()) {
			return;
		}

		var links = Chart.svg.select('.relationship-links').selectAll('.link')
			.data(Link.items, getId);

		links.exit().remove();

		//create new bricks
		Link.createD3(links.enter(), Link.addEvents);
		Link.updateD3(links);
	}


	static addEvents(links: any) {
		if (!links || links.empty())
			return;

		// links.on((isTouchDevice) ? 'touchstart' : 'mousedown', function(link){
		// 	CtxMenuManager.hide();
		// 	doSelectRelLink(link);
		// });

		// links.call(
		// 	d3.behavior.drag()
		//         .on('dragstart', onStartChildLink)
		//         .on('drag', onMoveChildLink)
		//         .on('dragend', onEndChildLink)
		// );

		return links;
	}

	static createD3(linksToAdd: any, addEventsCallback: any) {
		const { nodePortSize } = Chart;
		// console.log(`==== Link.screateD3`, { linksToAdd })

		var newLinks = linksToAdd.append('g')
			.attr('id', function (d: any) { return 'link-' + d.id; })
			.attr('class', 'link');

		newLinks.append('path')
			.attr('class', 'visible-link')
			.attr('stroke-width', '2px');

		newLinks.append('path')
			.attr('class', 'hidden-link')
			.attr('stroke-width', nodePortSize + 'px');

		// if( linksToAdd.length > 0 && linksToAdd[0].update.length > 2){
			console.log(`=========`, {newLinks})
		// 	newLinks.append('circle')
		// 	.style('stroke-width', 2)
		// 	.attr('class', 'children-port')
		// 	.attr("r", nodePortSize);
		// }
		

		// newLinks.append('circle')
		// 	.attr('class', 'hidden-port children-port')
		// 	.attr("r", nodePortSize * 1.5);


		if (addEventsCallback) {
			newLinks = addEventsCallback(newLinks);
		}


		return newLinks;
	}

	static updateD3(links: any) {
		links.classed('selected', function (d: any) { return d.selected; });
		links.each(function (d: any) {
			Link.render(d);
		});
	}

	static render(link: any, xs: any = 0, ys: any = 0, scale = 1) {
		const { xScale, yScale, currentScale, nodeWidth, nodeHeight, nodePortSize } = Chart;
		if (!link) {
			return;
		}
		const selection = d3.select(link);
		if (!selection || selection.empty()) {
			return;
		}

		xs = xs || xScale;
		ys = ys || yScale;
		scale = scale || currentScale;

		const p1 = Nodes.getNodeById(link.fromNode) || link.extraCoords;
		const p2 = Nodes.getNodeById(link.toNode) || link.extraCoords;
		if (!p1 || !p2) {
			//console.warn(`==== can not create links`, { p1, p2, link });
			return;
		}

		const points = {
			x1: p1.x + nodeWidth,
			y1: p1.y + (nodeHeight) * 0.5,
			x2: p2.x,
			y2: p2.y + (nodeHeight) * 0.5
		};


		//d3selection.selectAll('path')
		
		d3.select(`#link-${link.id} path`)
			.attr('d', drawLine(points, 'lr', xs, ys));

		var x1 = p1.x,
			y1 = Math.min(p1.y, p2.y),
			x2 = p2.x,
			y2 = (y1 == p1.y) ? p2.y : p1.y;

		//d3selection.selectAll('.children-port')
		d3.select(`#link-${link.id} .children-port`)
			.attr({
				'cx': xs((x2 + x1 + nodeWidth) * 0.5),
				'cy': ys((y2 + y1 + nodeHeight) * 0.5),
				'r': nodePortSize * scale,
				'stroke-width': 2 / scale
			});


		//d3selection.select('.hidden-port')
		d3.select(`#link-${link.id} .hidden-port`)
			.attr('r', nodePortSize * 1.5 * scale);

	
	}
}