import { filterByType } from "../fns/data.fns.js";
import { buildNestedTreeMapSvg } from "./nested-treemap.builder.js";

export function buildNestedTreeMap(data) {
  const tasks = filterByType(data[0], "Task", true);
  const root = {
    id: "root",
    type: "root",
    title: "root",
    children: tasks,
  };
  const svg = buildNestedTreeMapSvg(root);
  return svg;
}
