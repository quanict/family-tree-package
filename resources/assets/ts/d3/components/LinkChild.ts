import Chart from "./Chart";
import { getId, drawLine } from "../util/tree";
import * as d3 from "d3";
import Links from "./Links";
import Nodes from "./Nodes";

export default class LinkChild {
    static items: Array<any> = []
    static add(id:string , childId:any, relId:any){
        LinkChild.items.push({
            id:id, childId:childId, relId:relId
        })
    }

    static draw() {
		if (!Chart.svg || Chart.svg.empty())
			return; 
		
		var links = Chart.svg.select('.children-links').selectAll('.link')
			.data(LinkChild.items, getId);

		links.exit().remove();

		LinkChild.createD3(links.enter(), LinkChild.addEvents);
		LinkChild.updateD3(links);
	}

    static createD3(linksToAdd : any, addEventsCallback: any){
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

	static updateD3(links:any){
		links.classed('selected', function (d:any) { return d.selected; });
				
		links.each(function(d:any){
			LinkChild.render(d3.select(d), d);
		});
	}

	static render(d3selection: any, link : any, xs=0, ys=0){

		if (!link || !d3selection || d3selection.empty()){
			return;
		}
			
		const { xScale, yScale, nodePortSize } = Chart;

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

    static addEvents(links:any){
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
}