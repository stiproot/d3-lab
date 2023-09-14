import { sample_data } from "../data/weighted.js";
import { filterByType, filterForTreesWithTasks } from "./data.utils.js";
import { enrich, deepFilter } from "../fns/data.fns.js";
import { buildSunburstSvg } from "./sunburst.builder.js";

export function buildSunburst(_, container) {
  // const tasks = filterByType(sample_data[0], "Task", true);
  // const root = {
  //   id: "root",
  //   type: "root",
  //   title: "root",
  //   children: tasks,
  // };

  // const enrichFn = (node) => {
  //   if (!node.risk_weight) {
  //     node.risk_weight = 0;
  //   }
  // };
  const root = sample_data[0];
  // enrich(root, null, [enrichFn]);
  // console.log(root);
  const svg = buildSunburstSvg(root);
  container.append(svg);
}
