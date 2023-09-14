import { sample_data } from "../data/weighted.js";

const min = 1;
const max = 50;
const rndInt = () => Math.floor(Math.random() * (max - min + 1)) + min;
const enrich = (n) => {
  if (n["type"] === "Task") {
    n.risk_weight = rndInt();
  }

  (n.children ?? []).forEach((c) => enrich(c));
};

function filterFeaturesWithTasks(node) {
  if (node.type === 1) {
    // This node is a "Feature" node
    if (!node.children || node.children.every((child) => child.type !== 3)) {
      // If there are no child nodes of type "Task," filter out this feature
      return null;
    }
  }

  // Recursively process child nodes
  if (node.children) {
    node.children = node.children
      .map((child) => filterFeaturesWithTasks(child))
      .filter(Boolean);
  }

  return node;
}

// Call the filterFeaturesWithTasks function on your JSON data
const filteredData = filterFeaturesWithTasks(data);

console.log(filteredData);
export function build(container) {
  const data = sample_data;
  data.forEach((c) => enrich(c));
  const root = d3
    .hierarchy(data)
    .sum((d) => d.risk_weight)
    .sort((a, b) => b.value - a.value);

  console.log(root);

  var height = window.innerHeight,
    width = window.innerWidth;

  var svg = d3
    .select("body")
    .append("svg")
    .attr("height", height)
    .attr("width", width);

  // svg
  //   .selectAll("rect")
  //   .data(data)
  //   .enter()
  //   .append("rect")
  //   .attr("height", (d) => d * 50)
  //   .attr("width", 8)
  //   .attr("fill", "blue")
  //   .attr("x", (d, i) => 10 * i)
  //   .attr("y", (d, i) => height - d * 50);
}
