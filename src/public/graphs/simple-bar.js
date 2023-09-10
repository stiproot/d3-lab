const barData = [];

for (let i = 0; i < 50; i++) {
  barData.push(Math.random() * 300);
}

const margin = { top: 40, right: 0, bottom: 0, left: 30 },
  height = 400 - margin.top - margin.bottom,
  width = 600 - margin.left - margin.right,
  barWidth = 50,
  barOffset = 5;

const yScale = d3
  .scaleLinear()
  .domain([0, d3.max(barData)])
  .range([0, height]);

const yAxisValues = d3
  .scaleLinear()
  .domain([0, d3.max(barData)])
  .range([height, 0]);

const yAxisTicks = d3.axisLeft(yAxisValues).ticks(10);

const xScale = d3
  .scaleBand()
  .domain(barData)
  .paddingInner(0.1)
  .paddingOuter(0.1)
  .range([0, width]);

const colors = d3
  .scaleLinear()
  .domain([0, 65, d3.max(barData)])
  .range(["#FFFFFF", "#268BD2", "#DA3637"]);

export function buildSimpleBar(_data, container_id) {
  const tooltip = d3
    .select("body")
    .append("div")
    .style("position", "absolute")
    .style("padding", "0 10px")
    .style("background", "white")
    .style("opacity", 0);

  const chart = d3
    .select(container_id)
    .append("svg")
    //.style("background", "#dff0d8")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.right + ")")
    .selectAll("rect")
    .data(barData)
    .enter()
    .append("rect")
    .style("fill", colors)
    .attr("width", function (d) {
      return xScale.bandwidth();
    })
    .attr("height", 0)
    .attr("x", function (d) {
      return xScale(d);
    })
    .attr("y", height)
    .on("mouseover", function (d) {
      // tooltip.transition().duration(200).style("opacity", 0.9);
      // tooltip
      //   .html(d)
      //   .style("left", d3.event.pageX - 35 + "px")
      //   .style("top", d3.event.pageY - 30 + "px");

      d3.select(this).style("opacity", 0.5);
    })
    .on("mouseout", function (d) {
      d3.select(this).style("opacity", 1);
    });

  const yGuide = d3
    .select(container_id + " svg")
    .attr("transform", "translate(20,0)")
    .append("g")
    .call(yAxisTicks);

  chart
    .transition()
    .attr("height", function (d) {
      return yScale(d);
    })
    .attr("y", function (d) {
      return height - yScale(d);
    })
    .delay(function (d, i) {
      return i * 20;
    })
    .duration(300)
    .ease(d3.easeBounceOut);
}
