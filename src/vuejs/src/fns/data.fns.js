export const rndInt = (min = 1, max = 100) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const rndTitle = () => Math.random().toString(36).substr(2, 9);

export const enrich = (n, predicateFn, enrichFns) => {
  if (predicateFn && predicateFn(n)) {
    enrichFns.forEach((fn) => fn(n));
  }

  if (!predicateFn) {
    enrichFns.forEach((fn) => fn(n));
  }

  (n.children ?? []).forEach((c) => enrich(c, predicateFn, enrichFns));
};

export const deepFilter = (root, predicates, filtered) => {
  for (const node of root.children) {
    var match = true;
    for (const predicate of predicates) {
      match = match && predicate(node);
    }

    if (match) {
      filtered.push(node);
    }
  }

  for (const node of root.children) {
    deepFilter(node, predicates, filtered);
  }
};

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
