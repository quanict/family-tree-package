import * as d3 from "d3";

export default class Chart {
    static nodeWidth = 200; //200,
    static nodeHeight = 120; //90,
    static nodePadding = 10;
    static nodePortSize = 8;

    static imageSize = 0; //nodeHeight - 2 * nodePadding
    static dotRadius = 3;

    static isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    static currentScale = 1

    static svg: any;
    dataNodes: any = [];

    static xScale: any
    static yScale: any
    static zoom: any

    setDataNodes(params:any) {
        
    }

    static init(){
        const w = document.body.clientWidth;
        const h = document.body.clientHeight;
        const dom : any = document.getElementById('viewport');
        const viewport = d3.select(dom);

        this.svg = viewport.append('svg:svg')
        .attr('width', w)
        .attr('height', h);

    const defs = this.svg.append('defs');
    const maleGrad = this.svg.append('radialGradient');

    let panArea = this.svg.append('svg:rect').attr('class', 'zoom-pan-area')
        .attr('width', w)
        .attr('height', h)
        //.call(zoom)
        .on('dblclick.zoom', null);

    this.svg.append('g').attr('class', 'children-links')
        //.call(zoom)
        .on('dblclick.zoom', null);

        this.svg.append('g').attr('class', 'relationship-links')
        //.call(zoom)
        .on('dblclick.zoom', null);

        this.svg.append('g').attr('class', 'nodes')
        //.call(zoom)
        .on('dblclick.zoom', null);

        this.xScale = d3.scale.linear().domain([0, w]).range([0, w]);
		this.yScale = d3.scale.linear().domain([0, h]).range([0, h]);
    }
}