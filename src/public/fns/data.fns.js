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
