// import { sample_data } from "../data/nested-treemap-data.js";

const barData = [20, 30, 45, 15, 10, 5];
const height = 400,
  width = 600,
  barWidth = 50,
  barOffset = 5;

const yScale = d3
  .scaleLinear()
  .domain([0, d3.max(barData)])
  .range([0, height]);

export function buildSimpleBar(_data, container_id) {
  d3.select(container_id)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background", "#dff0d8")
    .selectAll("rect")
    .data(barData)
    .enter()
    .append("rect")
    .style("fill", "#3c763d")
    .attr("width", barWidth)
    .attr("height", function (d) {
      return yScale(d);
    })
    .attr("x", function (d, i) {
      return i * (barWidth + barOffset);
    })
    .attr("y", function (d) {
      return height - yScale(d);
    });

  //container.append(svg.node());
}
