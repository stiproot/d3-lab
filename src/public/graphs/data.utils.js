import { rndInt, rndTitle, enrich, deepFilter } from "../fns/data.fns.js";

export const filterByType = (raw, type = "Task", doEnrich = false) => {
  // enrich...
  if (doEnrich) {
    const isTaskPredicateFn = (n) => n["type"] === "Task";
    const enrichTaskFn = [(n) => (n.risk_weight = rndInt())];
    enrich(raw, isTaskPredicateFn, enrichTaskFn);
  }

  // filter...
  const filtered = [];
  const featureFilter = (n) => n.type == type;
  deepFilter(raw, [featureFilter], filtered);

  return filtered;
};

export const filterForTreesWithTasks = (raw, doEnrich = false) => {
  if (doEnrich) {
    const isTaskPredicateFn = (n) => n["type"] === "Task";
    const enrichTaskFn = [(n) => (n.risk_weight = rndInt())];
    enrich(raw, isTaskPredicateFn, enrichTaskFn);
  }

  const taskFilterFn = (_node, tasks) => {
    if (_node.type === "Task") {
      tasks.push(_node);
    } else {
      _node.children.forEach((c) => taskFilterFn(c, tasks));
    }
  };

  raw.children = raw.children.filter((n) => {
    const tasks = [];
    taskFilterFn(n, tasks);
    return tasks.length > 0;
  });

  return raw;
};
