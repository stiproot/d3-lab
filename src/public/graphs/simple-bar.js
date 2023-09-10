const barData = [];
for (let i = 0; i < 50; i++) {
  barData.push(Math.random() * 30);
}

const height = 400,
  width = 600,
  barWidth = 50,
  barOffset = 5;

const yScale = d3
  .scaleLinear()
  .domain([0, d3.max(barData)])
  .range([0, height]);

const xScale = d3
  .scaleBand()
  .domain(barData)
  .paddingInner(0.2)
  .paddingOuter(0.1)
  .range([0, width]);

// const colors = d3
//   .scaleLinear()
//   .domain([0, d3.max(barData)])
//   .range(["#FFB832", "#C61C6F"]);
const colors = d3
  .scaleLinear()
  .domain([0, barData.length * 0.33, barData.length * 0.66, barData.length])
  .range(["#FFB832", "#C61C6F", "#268BD2", "#85992C"]);

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
    .style("fill", function (d) {
      return colors(d);
    })
    .attr("width", function (d) {
      return xScale.bandwidth();
    })
    .attr("height", function (d) {
      return yScale(d);
    })
    .attr("x", function (d) {
      return xScale(d);
    })
    .attr("y", function (d) {
      return height - yScale(d);
    })
    .on("mouseover", function (d) {
      d3.select(this).style("opacity", 0.5);
    })
    .on("mouseout", function (d) {
      d3.select(this).style("opacity", 1);
    });
}
