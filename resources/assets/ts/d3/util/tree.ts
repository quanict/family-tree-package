import * as d3 from "d3";

export const getDataById = function (id: string, dataset: any) {
    let data = null;
    if (!Array.isArray(dataset)) {
        return data;
    }
    for (let i = 0; i < dataset.length; i++) {
        const d = dataset[i];
        if (d.id == id) {
            data = d;
            break;
        }
    }
    return data;
}

export function getId(d: any) {
    return d.id;
}

export function guid() {
    function s4() { return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1); };
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export function haveRelationship(id1: any, id2: any, set: any) {
    set = set || [];
    return set.some(function (link: any) {
        return (link.fromNode == id1 && link.toNode == id2) || (link.fromNode == id2 && link.toNode == id1);
    });
}

const linkLine = d3.svg.line()
    .interpolate('basis')
    .x(function (d: any) { return d[0]; })
    .y(function (d: any) { return d[1]; });

export function drawLine(points: any, direction: any, xs: any, ys: any) {
    var coords = getLinkingPoints(points, direction, xs, ys);

    return linkLine([
        [coords.start.x, coords.start.y],
        [coords.controlstart.x, coords.controlstart.y],
        [coords.controlend.x, coords.controlend.y],
        [coords.end.x, coords.end.y]
    ]);


}

export function getLinkingPoints(coords: any, direction: any, xScale: any, yScale: any) {
    direction = direction || 'tb';

    xScale = xScale || d3.scale.linear().domain([0, 1]).range([0, 1]);
    yScale = yScale || d3.scale.linear().domain([0, 1]).range([0, 1]);

    var s = {
        x: xScale(coords.x1),
        y: yScale(coords.y1)
    }, e = {
        x: xScale(coords.x2),
        y: yScale(coords.y2)
    };
    var z = { x: 0, y: 0 };
    if (direction == 'lr') {
        z.x = e.x - s.x;
        z.x *= (z.x < 0) ? -0.1 : 0.325;
        z.x = Math.max(z.x, xScale(75) - xScale(0));
    } else {
        z.y = e.y - s.y;
        z.y *= (z.y < 0) ? -0.1 : 0.325;
        z.y = Math.max(z.y, yScale(75) - yScale(0));
    }
    var cs = { 
        x: s.x + z.x,
        y: s.y + z.y
    },
        ce = { x: e.x - z.x, y: e.y - z.y };

    return { start: s, controlstart: cs, controlend: ce, end: e };
}
