import Chart from "./Chart";
import Nodes from "./Nodes";
import { guid, haveRelationship } from "../util/tree";
import { getDataById, getId, getLinkingPoints, drawLine } from "../util/tree";
import * as d3 from "d3";
import LinkChild from "./LinkChild";
import Link from "./Link";

/**
 * https://devdocs.io/d3~7/
 * https://github.com/d3/d3-interpolate
 * https://observablehq.com/@d3/d3-line
 */
export default class Links {

	static getRelLinkById(id: string, dataset: any = false) {
		return getDataById(id, dataset || Link.items);
	}

	static load(dataset: any) {
		dataset = dataset || [];

		dataset.forEach(function (data: any) {
			var id = data.id;
			if (Array.isArray(data.relationships)) {
				data.relationships.forEach(function (rel: any) {
					var partnerId = rel.partnerId;
					if (!haveRelationship(id, partnerId, Link.items)) {
						const relId = guid();
						const direction = rel.direction;
						const relLink: any = {
							id: relId,
							fromNode: (direction == 'to') ? id : partnerId,
							toNode: (direction == 'to') ? partnerId : id
						};

						Link.add(relId, (direction == 'to') ? id : partnerId, (direction == 'to') ? partnerId : id);

						if (Array.isArray(rel.children) && rel.children.length) {
							relLink.hasChildren = true;

							rel.children.forEach(function (childId: any) {
								LinkChild.add(guid(), childId, relId);
							});
						}
					}
				});
				delete data.relationships;
			}
		});
	}

	static draw() {
		Link.draw();
		LinkChild.draw();
	}

	static getStartPoint(d: any) {
		const { nodeWidth, nodeHeight } = Chart;
		var id = d.relId;
		let startPoint:any;

		const rel: any = Links.getRelLinkById(id);
		const p1: any = Nodes.getNodeById(rel.fromNode);
		const p2: any = Nodes.getNodeById(rel.toNode);
		if (p1 && p2) {
			var x1 = Math.min(p1.x, p2.x),
				y1 = Math.min(p1.y, p2.y),
				x2 = (x1 == p1.x) ? p2.x : p1.x,
				y2 = (y1 == p1.y) ? p2.y : p1.y;
			startPoint = {
				x: (x2 + x1 + nodeWidth) * 0.5,
				y: (y2 + y1 + nodeHeight) * 0.5
			};
			return startPoint;
		}

		const p = p1|| p2;
		startPoint = {
			x: p.x + (nodeWidth)*0.5,
			y: p.y + (nodeHeight)
		};
		return startPoint;
	}

	static getEndPoint(d: any) {
		const { nodeWidth, nodeHeight } = Chart;
		let x: any, y: any;
		if (d.childId) {
			var child = Nodes.getNodeById(d.childId);
			if (child) {
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