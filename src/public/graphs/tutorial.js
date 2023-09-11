export function build(container) {
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push(Math.random());
  }

  var height = window.innerHeight,
    width = window.innerWidth;

  var svg = d3
    .select("body")
    .append("svg")
    .attr("height", height)
    .attr("width", width);

  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("height", (d) => d * 50)
    .attr("width", 8)
    .attr("fill", "blue")
    .attr("x", (d, i) => 10 * i)
    .attr("y", (d, i) => 300 - d * 50);
}
