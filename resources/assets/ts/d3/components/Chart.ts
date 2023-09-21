import * as d3 from "d3";
import Nodes from "./Nodes";
import Groups from "./Groups";
import { isMulti } from "../util/selection-mode";
import Links from "./Links";
import { getViewport } from "../util/viewport";
import LinkChild from "./LinkChild";
import Link from "./Link";

export default class Chart {
    static LEVEL_LINE_SPACE = 300
    static nodeWidth = 200 //200,
    static nodeHeight = 120 //90,
    static nodePadding = 10
    static nodePortSize = 8;

    static imageSize = 0; //nodeHeight - 2 * nodePadding
    static dotRadius = 3;

    static isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    static currentScale = 1
    static maxScale = Chart.isTouchDevice ? 0.8 : 1

    static svg: any;
    // dataNodes: any = [];

    static xScale: any = null;
    static yScale: any = null;
    static zoom: any = null;
    static viewport: any = null;

    setDataNodes(params: any) {

    }

    static onResize() {
        var w = document.body.clientWidth,
            h = document.body.clientHeight,
            top = Chart.viewport.offsetTop,
            left = Chart.viewport.offsetLeft;
        h -= top;
        w -= left;

        $('.fixed-menu').css('max-height', h + 'px');

        Chart.resize(w, h);
    }

    static resize(w: number, h: number) {
        const { svg, xScale, yScale, isTouchDevice, dotRadius } = Chart;
        if (!svg || svg.empty())
            return;
        svg.attr('width', w).attr('height', h);
        if (
            // xScale.range() !== [0, w] 
            // || yScale.range() !== [0, h]
            true
        ) {
            svg.select('.zoom-pan-area')
                .attr('width', w)
                .attr('height', h);
            xScale.domain()[0] = xScale.invert(0);
            xScale.domain()[1] = xScale.invert(w);
            xScale.range()[0] = 0;
            xScale.range()[1] = w;
            yScale.domain()[0] = yScale.invert(0);
            yScale.domain()[1] = yScale.invert(h);
            yScale.range()[0] = 0;
            yScale.range()[1] = h;
        }
        if (isTouchDevice) {
            svg.select('#open-bg-context-menu').attr('transform', 'translate(' + (w - 2 * dotRadius) + ', 0)');
        }


        Chart.update();
    }

    static init() {
        const w = document.body.clientWidth;
        const h = document.body.clientHeight;
        const dom: any = document.getElementById('viewport');
        Chart.viewport = d3.select(dom);
        const { isTouchDevice, maxScale } = Chart;

        Chart.svg = Chart.viewport.append('svg:svg')
            .attr('width', w)
            .attr('height', h);

        const defs = Chart.svg.append('defs');
        //const maleGrad = this.svg.append('radialGradient');
        const maleGrad = Chart.svg.append('radialGradient')
            .attr({
                id: 'male-gradient',
                cx: '50%',
                cy: '50%',
                r: '75%',
                fx: '50%',
                fy: '50%',
            });
        maleGrad.append('stop').attr({
            offset: '0%',
            'class': 'male-color'
        })
        maleGrad.append('stop').attr({
            offset: '100%',
            'class': 'neutral-color'
        });

        var femaleGrad = Chart.svg.append('radialGradient')
            .attr({
                id: 'female-gradient',
                cx: '50%',
                cy: '50%',
                r: '75%',
                fx: '50%',
                fy: '50%',
            });
        femaleGrad.append('stop').attr({
            offset: '0%',
            'class': 'female-color'
        })
        femaleGrad.append('stop').attr({
            offset: '100%',
            'class': 'neutral-color'
        });



        Chart.xScale = d3.scale.linear().domain([0, w]).range([0, w]);
        Chart.yScale = d3.scale.linear().domain([0, h]).range([0, h]);
        Chart.zoom = d3.behavior.zoom().on('zoom', Chart.onZoom).x(Chart.xScale).y(Chart.yScale);
        Chart.zoom.scale(maxScale).scaleExtent([0, maxScale]);
        Chart.currentScale = maxScale;

        let panArea = Chart.svg.append('svg:rect').attr('class', 'zoom-pan-area')
            .attr('width', w)
            .attr('height', h)
            .call(Chart.zoom)
            .on('dblclick.zoom', null);

        Chart.svg.append('g').attr('class', 'children-links')
            .call(Chart.zoom)
            .on('dblclick.zoom', null);

        Chart.svg.append('g').attr('class', 'relationship-links')
            .call(Chart.zoom)
            .on('dblclick.zoom', null);

        Chart.svg.append('g').attr('class', 'nodes')
            .call(Chart.zoom)
            .on('dblclick.zoom', null);


        if (isTouchDevice) {
            var isLikeClickEvent = false;
            panArea
                .on('touchstart', function () {
                    //CtxMenuManager.hide();
                    isLikeClickEvent = true;
                }).on('touchmove', function () {
                    isLikeClickEvent = false;
                }).on('touchend', function () {
                    if (isLikeClickEvent && !isMulti())
                        Chart.deselectAll();
                    isLikeClickEvent = false;
                });
        } else {
            panArea
                .on('mousedown', function () {
                    //CtxMenuManager.hide();
                })
                .on('click', function () {
                    Chart.deselectAll();
                });
        }

        Chart.svg.append('g').attr('class', 'children-links')
            .call(Chart.zoom)
            .on('dblclick.zoom', null);

        Chart.svg.append('g').attr('class', 'relationship-links')
            .call(Chart.zoom)
            .on('dblclick.zoom', null);

        Chart.svg.append('g').attr('class', 'nodes')
            .call(Chart.zoom)
            .on('dblclick.zoom', null);

        Chart.svg.append('g').attr('class', 'groups')
            .call(Chart.zoom)
            .on('dblclick.zoom', null);
    }

    static onZoom() {
        //CtxMenuManager.hide();
        const { svg } = Chart;
        const dataNodes = Nodes.items;
        const dataGroups = Groups.items;

        if (!svg || svg.empty())
            return;

        let w = parseInt(svg.attr('width'));
        let h = parseInt(svg.attr('height'));
        //let t = d3.event.translate;
        //let s = d3.event.scale;

        if (dataNodes.length || dataGroups.length) {
            var canvasInfo = getViewport(dataNodes, dataGroups);
            Chart.currentScale = (<d3.ZoomEvent>d3.event).scale;

            const t = (<d3.ZoomEvent>d3.event).translate
            const minScale = Math.min(Math.min(h / canvasInfo.h, w / canvasInfo.w), 1);
            Chart.zoom.scaleExtent([minScale, 1]).translate(t);
        }
        Chart.update();
    }

    static centerTo(nodes: any, groups: any, transitionDuration: any) {
        const { svg, maxScale, zoom } = Chart;

        if (!svg || svg.empty()) {
            return;
        }

        const dataNodes = Nodes.items;
        const dataGroups = Groups.items;

        // nodes is a subset of dataNodes as well as groups is a subset of dataGroups
        if ((!dataNodes || !dataNodes.length) && (!dataGroups || !dataGroups.length)) {
            zoom.scale(maxScale).translate([0, 0]);
            Chart.currentScale = maxScale;
            Chart.update();
            return;
        }
        if ((!nodes || !nodes.length) && (!groups || !groups.length))
            return;

        var canvasInfo = getViewport(nodes, groups),
            w = parseInt(svg.attr('width')),
            h = parseInt(svg.attr('height'));
        canvasInfo.w -= 2 * canvasInfo.padding; // no padding
        canvasInfo.h -= 2 * canvasInfo.padding; // no padding
        var padding = 20;
        var newScale = Math.min(maxScale, Math.min((h - padding * 2) / canvasInfo.h, (w - padding * 2) / canvasInfo.w));
        var newTranslate: any = [];
        newTranslate[0] = w / 2 - newScale * (canvasInfo.xRange[0] + canvasInfo.xRange[1]) / 2;
        newTranslate[1] = h / 2 - newScale * (canvasInfo.yRange[0] + canvasInfo.yRange[1]) / 2;

        if (!transitionDuration) {
            Chart.currentScale = newScale;
            zoom.scale(newScale).translate(newTranslate);
            Chart.update();
        } else {
            let oldScale = Chart.currentScale;
            oldScale = 1
            const oldTranslate = zoom.translate();
            console.log(`========== Chart.centerTo`, { oldScale, oldTranslate, newTranslate })
            svg.transition().duration(transitionDuration).tween('zoomToCenterNodes', function () {
                var iScale = d3.interpolateNumber(oldScale, newScale);
                var iTranslateX = d3.interpolateNumber(oldTranslate[0], newTranslate[0]);
                var iTranslateY = d3.interpolateNumber(oldTranslate[1], newTranslate[1]);
                return function (t: any) {
                    Chart.currentScale = iScale(t);
                    zoom.scale(Chart.currentScale).translate([iTranslateX(t), iTranslateY(t)]);
                    Chart.update();
                };
            });
        }
    }

    static centerAll() {
        //CtxMenuManager.hide();
        const dataNodes = Nodes.items;
        const dataGroups = Groups.items;
        Chart.centerTo(dataNodes, dataGroups, 500);
    }

    static deselectAll() {
        // dataGroups.forEach(function(d){d.selected = false; });
        // dataNodes.forEach(function(d){d.selected = false; });
        // dataRelLinks.forEach(function(d){d.selected = false; });
        // dataChildLinks.forEach(function(d){d.selected = false; });
        // util.selectionMode.updateSelectedCounter(getSelectionCount());
        // update();
    }

    static update() {
        const { svg } = Chart;
        if (!svg || svg.empty())
            return;

        //_updateD3Groups(svg.selectAll('.groups .group'));
        Nodes.updateD3(svg.selectAll('.nodes .node'));
        Link.updateD3(svg.selectAll('.relationship-links .link'));
        LinkChild.updateD3(svg.selectAll('.children-links .link'));
    }
}