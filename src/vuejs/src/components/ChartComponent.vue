<template>
  <div ref="chartContainer"></div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useStructuredTreeStore } from "@/stores/structured-tree.store.js";
import { buildNestedTreeMap } from "@/builders/nested-treemap.manager.js";
export default {
  name: "ChartComponent",
  props: {
    tree: String,
  },
  setup(props) {
    const store = useStructuredTreeStore();
    const chartContainer = ref(null);

    onMounted(async () => {
      if (props.tree === "nested-treemap") {
        await store.init();
        const data = computed(() => store.getWeightedTree);
        const container = chartContainer.value;
        const svg = buildNestedTreeMap(data.value);
        container.appendChild(svg);
      }
    });

    return { chartContainer };
  },
};
</script>

<style scoped></style>
