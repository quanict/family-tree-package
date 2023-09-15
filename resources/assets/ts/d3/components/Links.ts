import Chart from "./Chart";
import Nodes from "./Nodes";
import { guid, haveRelationship } from "../util/tree";
import { getDataById, getId, getLinkingPoints, drawLine } from "../util/tree";
import * as d3 from "d3";

/**
 * https://devdocs.io/d3~7/
 * https://github.com/d3/d3-interpolate
 * https://observablehq.com/@d3/d3-line
 */
export default class Links {
	static dataRelLinks: any = []
	static dataChildLinks: any = []


	static getRelLinkById(id:string, dataset:any = false){
		return getDataById(id, dataset || Links.dataRelLinks);
	}
	
	static load(dataset: any) {
		Links.dataRelLinks = [];
		Links.dataChildLinks = [];
		dataset = dataset || [];

		dataset.forEach(function (data: any) {
			var id = data.id;
			if (Array.isArray(data.relationships)) {
				data.relationships.forEach(function (rel: any) {
					var partnerId = rel.partnerId;
					if (!haveRelationship(id, partnerId, Links.dataRelLinks)) {
						var relId = guid(),
							direction = rel.direction;
						var relLink: any = {
							id: relId,
							fromNode: (direction == 'to') ? id : partnerId,
							toNode: (direction == 'to') ? partnerId : id
						};
						Links.dataRelLinks.push(relLink);
						var children = rel.children;
						if (Array.isArray(children) && children.length) {
							relLink.hasChildren = true;

							children.forEach(function (childId) {
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
		Links.drawChild();
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

	static drawChild() {
		if (!Chart.svg || Chart.svg.empty())
			return; 
		
		var links = Chart.svg.select('.children-links').selectAll('.link')
			.data(Links.dataChildLinks, getId);

		links.exit().remove();

		Links.createD3Child(links.enter(), Links.addEventsToChildLinks);
		Links.updateD3Child(links);
	}

	static addEventsToRelLinks(links: any) {
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

	static addEventsToChildLinks(links:any){
		if (!links || links.empty())
			return; 


		// if (isTouchDevice)
		// 	links
		// 		.on('touchstart', function(link){
		// 			CtxMenuManager.hide();
		// 			doSelectChildLink(link)
		// 			var sourceEvent = d3.event.sourceEvent;
					
		// 			if (!util.selectionMode.isMulti()){
		// 				startTouchTime = new Date().getTime();
		// 				touchMove = false
		// 				stillTouching = true;
		// 	  			setTimeout(function(){
		// 	  				checkTapHold(startTouchTime);
		// 	  			}, 750);
		// 	  		}
		//   			return;		
		// 		})
		// 		.on('touchmove', function (link){
		// 			if (!util.selectionMode.isMulti())
		// 				touchMove = true;
		// 		})
		// 		.on('touchend', function(link){
		// 			if (!util.selectionMode.isMulti())
		// 				stillTouching = false;
		// 		})

		// else
		// 	links.on('mousedown', function(link){
		// 		CtxMenuManager.hide();
		// 		doSelectChildLink(link);
		// 	});

		return links;
	}

	static createD3(linksToAdd: any, addEventsCallback: any) {
		const { nodePortSize } = Chart;

		var newLinks = linksToAdd.append('g')
			.attr('id', function (d: any) { return 'link-' + d.id; })
			.attr('class', 'link');

		newLinks.append('path')
			.attr('class', 'visible-link')
			.attr('stroke-width', '2px');

		newLinks.append('path')
			.attr('class', 'hidden-link')
			.attr('stroke-width', nodePortSize + 'px');

		newLinks.append('circle')
			.style('stroke-width', 2)
			.attr('class', 'children-port')
			.attr("r", nodePortSize);

		newLinks.append('circle')
			.attr('class', 'hidden-port children-port')
			.attr("r", nodePortSize * 1.5);


		if (addEventsCallback) {
			newLinks = addEventsCallback(newLinks);
		}


		return newLinks;
	}

	static updateD3(links: any) {
		links.classed('selected', function (d: any) { return d.selected; });
		links.each(function (d: any) {
			Links.render(d);
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

		var p1 = Nodes.getNodeById(link.fromNode) || link.extraCoords;
		const p2 = Nodes.getNodeById(link.toNode) || link.extraCoords;

		var points = {
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

	static createD3Child(linksToAdd : any, addEventsCallback: any){
		var newLinks = linksToAdd.append('g').attr({
			'id': function(d: any){ return 'link-' + d.id; },
			'class': 'link'
		});
		
		newLinks.append('path')
			.attr({
				'class': 'visible-link',
				'stroke-width': '2px'
			});
		
		newLinks.append('path')
			.attr({
				'class': 'hidden-link',
				'stroke-width': Chart.nodePortSize + 'px'
			});
		
		if (addEventsCallback) {
			newLinks = addEventsCallback(newLinks);
		}
        	
		return newLinks;
	}

	static updateD3Child(links:any){
		links.classed('selected', function (d:any) { return d.selected; });
				
		links.each(function(d:any){
			Links.renderChild(d3.select(d), d);
		});
	}

	static renderChild(d3selection: any, link : any, xs=0, ys=0){

		if (!link || !d3selection || d3selection.empty()){
			return;
		}
			
		const { xScale, yScale } = Chart;

		xs = xs || xScale;
		ys = ys || yScale;

		var p1 = Links.getStartPoint(link);
		var p2 = Nodes.getEndPoint(link);
		// link path
		var points = {
			x1: p1.x,
			y1: p1.y, 
			x2: p2.x,
			y2: p2.y
		};

		//d3selection.selectAll('path')
		d3.select(`#link-${link.id} path`)
		.attr('d', drawLine(points, 'tb', xs, ys));
	}

	static getStartPoint(d : any){
		const { nodeWidth, nodeHeight } = Chart;

		var id = d.relId;
		const rel:any = Links.getRelLinkById(id),
			p1:any = Nodes.getNodeById(rel.fromNode),
			p2:any = Nodes.getNodeById(rel.toNode);

		var x1 = Math.min(p1.x, p2.x),
			y1 = Math.min(p1.y, p2.y),
			x2 = (x1 == p1.x) ? p2.x : p1.x,
			y2 = (y1 == p1.y) ? p2.y : p1.y;
		var startPoint = { 
			x: (x2 + x1 + nodeWidth) * 0.5, 
			y: (y2 + y1 + nodeHeight ) * 0.5
		};
		return startPoint;
	}
	
	static getEndPoint(d:any){
		const { nodeWidth, nodeHeight } = Chart;
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
	}

}