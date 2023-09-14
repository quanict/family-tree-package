import Chart from "./Chart";
import * as d3 from "d3";

export default class Text {
    public static setVisibleText(label: any, id: any, className: any) { // one row and tagName text
        let visibleLabel = label;
        let width = Chart.nodeWidth - (3 * Chart.nodePadding + Chart.imageSize);
        let d3Text;

        if (!Chart.svg || Chart.svg.empty())
            return visibleLabel;

        d3Text = Chart.svg
            .append('text')
            .attr('id', 'pre-compute-' + id)
            .attr('class', className)
            .text(visibleLabel);

        while (d3Text.node().getComputedTextLength() >= width) {
            visibleLabel = label.substring(0, visibleLabel.length - 1);
            d3Text.text(visibleLabel + '...');
        }

        if (visibleLabel != label) {
            visibleLabel += '...';
        }
        d3.selectAll('#pre-compute-' + id).remove();
        return visibleLabel;
    }
}