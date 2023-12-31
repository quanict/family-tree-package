import d3 from "d3";
import dictionary from "./dictionary"

const tooltipManager = function(isTouchDevice){

    let tooltipData = null;
    let tooltip = null;

    function _isHidden() {
        if (!tooltip || tooltip.empty()) return true;
        var opacity = tooltip.style('opacity');
        return (opacity.length) ? (parseFloat(opacity) == 0) : tooltip.classed('hide');
    }

    function createTooltip(d3selection, targetSvg){
        if (!d3selection || d3selection.empty())
            return;

        tooltip = d3selection.append('div')
            .attr('class', 'tooltip')
            .style("opacity", 0);

        tooltip.append('span')
            .attr('class', 'glyphicon glyphicon-remove')
            .classed('hide', !isTouchDevice)
            .style('float', 'right')
            .on(isTouchDevice ? 'touchstart' : 'click', function(){ hide(200); });

        tooltip.append('table');

        if (!isTouchDevice && targetSvg && !targetSvg.empty())
            targetSvg.on('mousemove', function () {
                setPosition(d3.mouse(this), targetSvg.node());
            });
    }

    function removeTooltip(){
        if (!tooltip || tooltip.empty())
            return;
        tooltip.remove();
    }

    function setPosition(pos, container) {
        if (!tooltip || tooltip.empty())
            return;

        var tooltipDom = tooltip.node();
        var w_tooltip = tooltipDom.offsetWidth,
            h_tooltip = tooltipDom.offsetHeight,
            bbox = container.getBoundingClientRect(),
            padding = 16,
            x0 = pos[0],
            y0 = pos[1];

        if (isTouchDevice){
            var dx = bbox.left + bbox.width - (x0 + w_tooltip),
                dy = bbox.top + bbox.height - (y0 + h_tooltip);

            x0 = (dx < 0) ? x0 + dx : x0;
            y0 = (dy < 0) ? y0 + dy : y0;
        } else {
            x0 += padding;
            y0 += padding + h_tooltip;

            x0 = (x0 + w_tooltip > bbox.left + bbox.width) ? pos[0] - w_tooltip - padding : x0;
            y0 = (y0 + h_tooltip > bbox.top + bbox.height) ? pos[1] + padding : y0;
        }
        x0 = (x0 < bbox.left) ? bbox.left : x0;
        y0 = (y0 < bbox.top) ? bbox.top : y0;

        tooltip.styleObj = tooltip.styleObj || {};
        tooltip.styleObj.left = x0 + 'px';
        tooltip.styleObj.top = y0 + 'px';
        tooltip.style(tooltip.styleObj);
    }

    function hide(withTransition) {
        if (!tooltip || tooltip.empty())
            return;
        tooltip.transition().duration(withTransition).style('opacity', 0);
        tooltipData = null;
        if (isTouchDevice)
            tooltip.style('pointer-events', 'none');
    }

    function showAt(data, pos, container){
        show(data);
        setPosition(pos, container);
    }

    function show(data, time=0) {
        if (!tooltip || tooltip.empty()) return;

        _update(data);
        tooltip.transition().duration(100).style('opacity', 0.85);

        if (isTouchDevice)
            tooltip.style('pointer-events', 'all');
    }

    function _update(data){
        if (!tooltip || tooltip.empty()) return;

        var html = '';
        if (data && data.isNode)
            html = _getNodeHTML(data);
        else if (data && data.isGroup)
            html = _getGroupHTML(data);

        tooltip.select('table').html(html);
        tooltipData = data;
    }

    function _getNodeHTML(data){
        var html = '';
        if (!data.isNode)
            return html;

        html += '<tr class="tooltip-info"><td>' + dictionary.get('Name') + '</td><td><span class="tooltip-value">'
            + (data.name || '---')
            + '</span></td></tr><tr class="tooltip-info"><td>' + dictionary.get('Surname') + '</td><td><span class="tooltip-value">'
            + (data.surname || '---');
        if (data.description){
            var lines = data.description.split(/\r\n|\r|\n/);
            lines.forEach(function(line, i){
                html += '</span></td></tr><tr class="tooltip-info"><td>' + ((i==0) ? dictionary.get('Description') : '') + '</td><td><span class="tooltip-value">' + line;
            });
        } else
            html += '</span></td></tr><tr class="tooltip-info"><td>' + dictionary.get('Description') + '</td><td><span class="tooltip-value">---';
        html += '</span></td></tr>';
        return html;
    }

    function _getGroupHTML(data){
        var html = '';
        if (!data.isGroup)
            return html;

        html += '<tr class="tooltip-info"><td>' + dictionary.get('Description') + '</td><td><span class="tooltip-value">';
        if (data.text){
            var lines = data.text.split(/\r\n|\r|\n/);
            lines.forEach(function(line, i){
                if (i==0){
                    html += line + '</span></td></tr>';
                    return;
                }
                html += '<tr class="tooltip-info"><td></td><td><span class="tooltip-value">' + line + '</span></td></tr>';
            });
        } else
            html += '---</span></td></tr>';
        return html;
    }

    return {
        create: createTooltip,
        remove:  removeTooltip,
        setPosition: setPosition,
        show: show,
        showAt: showAt,
        hide: hide
    }
}

export default tooltipManager;
