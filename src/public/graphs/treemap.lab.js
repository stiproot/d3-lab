import { sample_data } from "../data/weighted.js";
import { filterByType, filterForTreesWithTasks } from "./data.utils.js";
import { buildTreeMapSvg } from "./treemap.builder.js";

export function buildTreeMap(_, container) {
  const tasks = filterByType(sample_data[0], "Task", true);
  const root = {
    id: "root",
    type: "root",
    title: "root",
    children: tasks,
  };
  console.log(root);
  const svg = buildTreeMapSvg(root);
  container.append(svg);
}
