import Chart from "./Chart";
import Nodes from "./Nodes";
import {guid, haveRelationship} from "../util/tree";
import { getDataById, getId, getLinkingPoints, drawLine } from "../util/tree";
import { Selection, SelectionFn, select } from "d3-selection";
import * as d3 from "d3";

/**
 * https://github.com/d3/d3-interpolate
 * https://observablehq.com/@d3/d3-line
 */
export default class Links {
    static dataRelLinks : any= []
    static dataChildLinks :any = []

	

    static load(dataset:any){
		Links.dataRelLinks = [];
		Links.dataChildLinks = [];
		dataset = dataset || [];
				
		dataset.forEach(function(data:any){
			var id = data.id;
			if (Array.isArray(data.relationships)){
				data.relationships.forEach(function(rel:any){
					var partnerId = rel.partnerId;
					if (!haveRelationship(id, partnerId, Links.dataRelLinks)){
						var relId = guid(),
							direction = rel.direction;
						var relLink : any = {
							id: relId,
							fromNode: (direction == 'to') ? id : partnerId,
							toNode: (direction == 'to') ? partnerId : id
						};
						Links.dataRelLinks.push(relLink);
						var children = rel.children;
						if (Array.isArray(children) && children.length){
							relLink.hasChildren = true;

							children.forEach(function(childId){
								Links.dataChildLinks.push({
									id: guid(),
									childId: childId,
									relId: relId
								});
							});
						}
					}					
				});
				delete data.relationships;
			}	
		});
	}

	static draw() {
        Links.drawRel();
        //Links.drawChild();
    }

	static drawRel() {
		if (!Chart.svg || Chart.svg.empty()) {
            return;
        }
		
		var links = Chart.svg.select('.relationship-links').selectAll('.link')
			.data(Links.dataRelLinks, getId);
		
		links.exit().remove();

		//create new bricks
		Links.createD3(links.enter(), Links.addEventsToRelLinks);
		Links.updateD3(links);
	}

	static addEventsToRelLinks(links:any){
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

	static createD3(linksToAdd:any, addEventsCallback:any){
		const {nodePortSize} = Chart;

		var newLinks = linksToAdd.append('g')
		.attr('id', function(d:any){ return 'link-' + d.id; })
		.attr('class', 'link');
		
		newLinks.append('path')
		.attr('class', 'visible-link')
			.attr('stroke-width', '2px');
		
		newLinks.append('path')
		.attr('class', 'hidden-link')
			.attr('stroke-width', nodePortSize + 'px');

		newLinks.append('circle')
			.style('stroke-width',  2)
			.attr('class', 'children-port')
			.attr("r", nodePortSize);

		newLinks.append('circle')
		.attr('class', 'hidden-port children-port')
			.attr("r", nodePortSize * 1.5);


        if (addEventsCallback)
        	newLinks = addEventsCallback(newLinks);
		
		return newLinks;		
	}

	static updateD3(links:any){
		console.log(`=== Links.updateD3`, {links})
		links.classed('selected', function (d:any) { return d.selected; });
		links.enter()
			.each(function(d:any){
				console.log(`=== Links.updateD3 loop item`, {d})
				Links.render(d3.select(d), d);
			});
	}

	static render(d3selection:any, link:any, xs:any=0, ys:any=0, scale=1){
		const {xScale, yScale, currentScale, nodeWidth, nodeHeight, nodePortSize} = Chart;

		if (!d3selection || !link || d3selection.empty()){
			console.warn(`===== link.render selection is empty`, {d3selection})
			return;
		}
			
		xs = xs || xScale;
		ys = ys || yScale;
		scale = scale || currentScale;

		var p1 = Nodes.getNodeById(link.fromNode) || link.extraCoords;
		const p2 = Nodes.getNodeById(link.toNode) || link.extraCoords;
		console.warn(`===== link.render selection is empty`, {p1, p2, link})
		var points = {
			x1: p1.x + nodeWidth,
			y1: p1.y + (nodeHeight) * 0.5, 
			x2: p2.x,
			y2: p2.y + (nodeHeight) * 0.5
		};
		d3selection.selectAll('path').attr('d', drawLine(points, 'lr', xs, ys));
		var x1 = p1.x,
			y1 = Math.min(p1.y, p2.y),
			x2 = p2.x,
			y2 = (y1 == p1.y) ? p2.y : p1.y;
		
		d3selection.selectAll('.children-port').attr({
			'cx': xs((x2 + x1 + nodeWidth) * 0.5),
			'cy': ys((y2 + y1 + nodeHeight ) * 0.5),
			'r': nodePortSize * scale,
			'stroke-width': 2 / scale
		});
		d3selection.select('.hidden-port').attr('r', nodePortSize * 1.5 * scale);
	}
}