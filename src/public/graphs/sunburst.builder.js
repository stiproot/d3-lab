export function buildSunburstSvg(data, max = 100) {
  // Specify the chart’s colors and approximate radius (it will be adjusted at the end).
  const color = d3.scaleOrdinal(
    d3.quantize(d3.interpolateRainbow, data.children.length + 1)
  );
  // const radius = 928 / 2;
  const radius = window.innerWidth / 2;

  // Prepare the layout.
  const partition = (data) =>
    d3.partition().size([2 * Math.PI, radius])(
      d3
        .hierarchy(data)
        //.sum((d) => d.value)
        .sum((d) => d.risk_weight)
        .sort((a, b) => b.value - a.value)
    );

  // const width = window.innerWidth;
  // const height = 750;
  const arc = d3
    .arc()
    // .size([width, height])
    .startAngle((d) => d.x0)
    .endAngle((d) => d.x1)
    .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.005))
    .padRadius(radius / 2)
    .innerRadius((d) => d.y0)
    .outerRadius((d) => d.y1 - 1);

  const root = partition(data);

  // Create the SVG container.
  const svg = d3.create("svg");

  // Add an arc for each element, with a title for tooltips.
  const format = d3.format(",d");
  svg
    .append("g")
    .attr("fill-opacity", 0.6)
    .selectAll("path")
    .data(root.descendants().filter((d) => d.depth))
    .join("path")
    .attr("fill", (d) => {
      while (d.depth > 1) d = d.parent;
      return color(d.data.title);
    })
    .attr("d", arc)
    .append("title")
    .text(
      (d) =>
        `${d
          .ancestors()
          .map((d) => d.data.title)
          .reverse()
          .join("/")}\n${format(d.value)}`
    );

  // Add a label for each element.
  svg
    .append("g")
    .attr("pointer-events", "none")
    .attr("text-anchor", "middle")
    .attr("font-size", 10)
    .attr("font-family", "sans-serif")
    .selectAll("text")
    .data(
      root
        .descendants()
        .filter((d) => d.depth && ((d.y0 + d.y1) / 2) * (d.x1 - d.x0) > 10)
    )
    .join("text")
    .attr("transform", function (d) {
      const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
      const y = (d.y0 + d.y1) / 2;
      return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
    })
    .attr("dy", "0.35em")
    .text((d) => d.data.title);

  // The autoBox function adjusts the SVG’s viewBox to the dimensions of its contents.
  // return svg.attr("viewBox", autoBox).node();
  return svg.node();
}
