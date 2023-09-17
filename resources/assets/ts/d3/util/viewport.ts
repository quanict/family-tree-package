import * as d3 from "d3";
import Chart from "../components/Chart";
import Groups from "../components/Groups";
import Nodes from "../components/Nodes";

// private methods
export function getViewport(nodes:any, groups:any){
    const {xScale, yScale} = Chart;
    var nViewport = getNodesViewport(nodes),
        gViewport = getGroupsViewport(groups);
    
    let canvasInfo : any = null;
    
    if (!gViewport && !nViewport){
        canvasInfo = {
            padding: 0,
            xRange: xScale.domain(),
            yRange: yScale.domain()
        };
        canvasInfo.w = canvasInfo.xRange[1] - canvasInfo.xRange[0];            
        canvasInfo.h = canvasInfo.yRange[1] - canvasInfo.yRange[0];
        return canvasInfo;
    }

    if (gViewport && !nViewport)
        return gViewport;

    if (!gViewport && nViewport)
        return nViewport;

    canvasInfo = {        
        xRange : [
            Math.min(nViewport.xRange[0], gViewport.xRange[0]),
            Math.max(nViewport.xRange[1], gViewport.xRange[1])
        ],
        yRange : [
            Math.min(nViewport.yRange[0], gViewport.yRange[0]),
            Math.max(nViewport.yRange[1], gViewport.yRange[1])
        ]
    };

    canvasInfo.w = canvasInfo.xRange[1] - canvasInfo.xRange[0];
    canvasInfo.h = canvasInfo.yRange[1] - canvasInfo.yRange[0];

    canvasInfo.padding = Math.max(canvasInfo.w, canvasInfo.h) * 0.5;
    canvasInfo.w += 2 * canvasInfo.padding;
    canvasInfo.h += 2 * canvasInfo.padding;

    return canvasInfo;
}

export function getNodesViewport(nodes: any) {
    const {nodeWidth, nodeHeight} = Chart;
    nodes = nodes || [];
    let canvasInfo: any = {};
    if (!nodes.length) {
        canvasInfo = null;
    } else {
        canvasInfo.xRange = [
            d3.min(nodes, function (d: any) {
                return d.x;
            }),
            d3.max(nodes, function (d: any) {
                return d.x + nodeWidth;
            })
        ];
        canvasInfo.yRange = [
            d3.min(nodes, function (d: any) {
                return d.y;
            }),
            d3.max(nodes, function (d: any) {
                return d.y + nodeHeight;
            })
        ];

        canvasInfo.w = canvasInfo.xRange[1] - canvasInfo.xRange[0];
        canvasInfo.h = canvasInfo.yRange[1] - canvasInfo.yRange[0];

        canvasInfo.padding = Math.max(canvasInfo.w, canvasInfo.h) * 0.5;
        canvasInfo.w += 2 * canvasInfo.padding;
        canvasInfo.h += 2 * canvasInfo.padding;
    }
    return canvasInfo;
}

export function getGroupsViewport(groups:any){
    const {nodeWidth, nodeHeight} = Chart;
    groups = groups || Groups.items;
    var canvasInfo : any = {};
    if (!groups.length) {
        canvasInfo = null;
    } else {
        // textareas range
        canvasInfo.xRange = [
            d3.min(groups, function (d:any) { return d.x; }) ,
            d3.max(groups, function (d:any) { return d.x + d.width; })
        ];
        canvasInfo.yRange = [
            d3.min(groups, function (d:any) { return d.y; }),
               d3.max(groups, function (d:any) { return d.y + d.height; })
        ];

        let nodes:any = [];
        groups.forEach(function(group:any){
            group.nodes.forEach(function(nodeId:any){
                let node:any = Nodes.getNodeById(nodeId);
                if (node && nodes.indexOf(node) == -1)
                    nodes.push(node);
            })
        });

        if (nodes.length){
            canvasInfo.xRange[0] = Math.min(canvasInfo.xRange[0], d3.min(nodes, function (d:any) { return d.x; }));
            canvasInfo.xRange[1] = Math.max(canvasInfo.xRange[1], d3.max(nodes, function (d:any) { return d.x + nodeWidth; }));
            canvasInfo.yRange[0] = Math.min(canvasInfo.yRange[0], d3.min(nodes, function (d:any) { return d.y; }));
            canvasInfo.yRange[1] = Math.max(canvasInfo.yRange[1], d3.max(nodes, function (d:any) { return d.y + nodeHeight; }));
        }

        canvasInfo.w = canvasInfo.xRange[1] - canvasInfo.xRange[0];
        canvasInfo.h = canvasInfo.yRange[1] - canvasInfo.yRange[0];

        canvasInfo.padding = Math.max(canvasInfo.w, canvasInfo.h) * 0.5;
        canvasInfo.w += 2 * canvasInfo.padding;
        canvasInfo.h += 2 * canvasInfo.padding;
    }
    return canvasInfo;
}